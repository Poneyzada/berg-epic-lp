from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import datetime

app = FastAPI(title="Berg Epic CRM API")

class Lead(BaseModel):
    nome: str
    whatsapp: str
    interesse: str
    origem: str # 'ICP' or 'Seminar'
    metadata: Optional[dict] = None

# In-memory storage for demonstration (Replace with Supabase)
leads_db = []

@app.get("/")
async def root():
    return {"status": "online", "message": "Berg Epic CRM API is running"}

@app.post("/leads")
async def create_lead(lead: Lead):
    lead_data = lead.dict()
    lead_data['id'] = len(leads_db) + 1
    lead_data['created_at'] = datetime.datetime.now().isoformat()
    
    # Intelligence for Remarketing Message
    interesse = lead.interesse.lower()
    metadata = lead.metadata or {}
    level = metadata.get('level', 'unknown')
    
    if "single leg x" in interesse:
        if level == 'white':
            msg = f"Olá {lead.nome}! Vi que você quer focar em Passagem e está na base (Branca/Azul). O curso de SLX: Conceitos é o ideal pra você não se embolar mais. Vamos liberar seu acesso?"
        else:
            msg = f"Fala {lead.nome}! Notei seu interesse no SLX. Para o seu nível, o Berg sugere focar nas variações de controle. Quer ver o cronograma?"
    elif "pressão" in interesse or "diamante" in interesse:
        msg = f"Olá {lead.nome}! Pressão faz Diamantes é o curso mais vendido do Berg. Como você quer aniquilar a guarda dos adversários, esse é o caminho. Tem interesse em um cupom?"
    elif "finalização" in interesse:
        msg = f"Fala {lead.nome}! Ajuste fino é tudo. O Berg separou um módulo de Finalização Estrutural que casa certinho com o seu jogo. Quer o link?"
    else:
        msg = f"Olá {lead.nome}! Vi seu interesse no protocolo do Berg. Como posso te ajudar a evoluir seu Jiu-Jitsu hoje?"
    
    lead_data['suggested_remarketing'] = msg
    leads_db.append(lead_data)
    
    return {"message": "Lead capturado com sucesso", "lead": lead_data}

@app.get("/leads", response_model=List[dict])
async def get_leads():
    return leads_db
