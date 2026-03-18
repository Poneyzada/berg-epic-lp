from http.server import BaseHTTPRequestHandler
import json
import os
from supabase import create_client, Client

# Supabase Setup
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key) if url and key else None

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        # Eduzz costuma enviar como Form Data ou JSON
        try:
            data = json.loads(post_data)
        except:
            # Se falhar JSON, tenta processar como query string (Eduzz legada)
            from urllib.parse import parse_qs
            data = {k: v[0] for k, v in parse_qs(post_data.decode()).items()}

        # Mapeamento de Status Eduzz
        # 3 = Paga, 10 = Abandono de Checkout
        eduzz_status = str(data.get('trans_status') or data.get('status'))
        email = data.get('cus_email') or data.get('email')
        tel = data.get('cus_tel') or data.get('tel')

        new_status = "Lead"
        if eduzz_status == "3":
            new_status = "Pago"
        elif eduzz_status == "10":
            new_status = "Abandonado"
        elif eduzz_status in ["1", "2"]:
            new_status = "No Checkout"

        if supabase and (email or tel):
            query = supabase.table("leads").update({"status": new_status})
            if email:
                query = query.eq("metadata->>email", email)
            elif tel:
                # Remove formatação do tel se necessário
                clean_tel = ''.join(filter(str.isdigit, tel))
                query = query.ilike("whatsapp", f"%{clean_tel}%")
            
            query.execute()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({"status": "received"}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
