from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import claims as claim_router
from app.router import documents as document_router
from app.router import s3 as s3_router

app = FastAPI(title="Claims Insurance API")

# CORS first is fine either way
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include each router ONCE. They already declare their own prefixes.
app.include_router(claim_router.router)
app.include_router(document_router.router)
app.include_router(s3_router.router)

@app.get("/health")
def health():
    return {"status": "OK"}
