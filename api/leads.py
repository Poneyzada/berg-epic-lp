from http.server import BaseHTTPRequestHandler
import json
import datetime
import os
from supabase import create_client, Client

# Supabase Setup (Environment variables from Vercel)
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key) if url and key else None

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        # Intelligence for Remarketing Message
        nome = data.get('nome', 'Atleta')
        interesse = data.get('interesse', '').lower()
        level = data.get('metadata', {}).get('level', 'unknown')
        
        if "single leg x" in interesse:
            msg = f"Olá {nome}! Vi que você quer focar em Passagem. O Berg sugere o curso de SLX. Vamos fechar?"
        elif "pressão" in interesse:
            msg = f"Olá {nome}! O curso de Pressão faz Diamantes é o ideal pra você. Quer o link?"
        else:
            msg = f"Olá {nome}! Vi seu interesse no protocolo do Berg. Como posso te ajudar hoje?"

        lead_data = {
            "nome": nome,
            "whatsapp": data.get('whatsapp'),
            "interesse": data.get('interesse'),
            "origem": data.get('origem'),
            "metadata": data.get('metadata'),
            "suggested_remarketing": msg,
            "created_at": datetime.datetime.now().isoformat()
        }

        # Save to Supabase if configured
        if supabase:
            supabase.table("leads").insert(lead_data).execute()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({"message": "Lead capturado", "lead": lead_data}).encode())

    def do_GET(self):
        # Fetch from Supabase
        if not supabase:
            self.send_response(200) # Mantemos 200 para não quebrar o fetch, mas enviamos objeto de erro
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            diagnostic = {
                "error": "Database not configured",
                "detail": "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in Environment Variables",
                "data": []
            }
            self.wfile.write(json.dumps(diagnostic).encode())
            return

        response = supabase.table("leads").select("*").order("created_at", desc=True).execute()
        leads = response.data

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(leads).encode())

    def do_PUT(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        
        email = data.get('whatsapp') # Usando whatsapp como ID único por enquanto
        status = data.get('status')
        
        if supabase and email and status:
            supabase.table("leads").update({"status": status}).eq("whatsapp", email).execute()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({"message": "Status atualizado"}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
