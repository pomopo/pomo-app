# app/api/dashboard.py

from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

router = APIRouter()

# Google Gemini APIキーを環境変数から取得
GOOGLE_API_KEY = "Gitにあげるのはちょっと..."

# Gemini APIに接続設定
genai.configure(api_key=GOOGLE_API_KEY)

class WordRequest(BaseModel):
    word: str

@router.post("/word")
async def receive_word(request: WordRequest):
    prompt = f"以下の単語について面白く返して: {request.word}"
    print("GOOGLE_API_KEY:", GOOGLE_API_KEY)

    try:
        print("Geminiプロンプト送信中...")
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        print("Gemini応答取得完了")
        answer = response.text
        if not answer:
            answer = "（Geminiからの応答がありませんでした）"
    except Exception as e:
        answer = f"エラーが発生しました: {str(e)}"


    print(f"受信した単語: {request.word}")
    print(f"Geminiの応答: {answer}")
    time.sleep(3)
    return {"message": answer}
