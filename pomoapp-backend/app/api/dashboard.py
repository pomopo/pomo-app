# app/api/dashboard.py

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class WordRequest(BaseModel):
    word: str

@router.post("/word")
async def receive_word(request: WordRequest):
    print(f"受信した単語: {request.word}")
    return {"message": f"受け取りました: {request.word}"}
