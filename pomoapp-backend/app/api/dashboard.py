from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

# .env を読み込む
load_dotenv()

router = APIRouter()

# 環境変数からAPIキーを取得
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

print("DEBUG: 現在のディレクトリ:", os.getcwd())
print("DEBUG: GOOGLE_API_KEY:", os.getenv("GOOGLE_API_KEY"))

# Gemini APIに接続設定
genai.configure(api_key=GOOGLE_API_KEY)

class WordRequest(BaseModel):
    word: str

@router.post("/word")
async def receive_word(request: WordRequest):
    prompt = f"以下の単語について10文字以下の単語で面白く返して: {request.word}"
    print("GOOGLE_API_KEY:", GOOGLE_API_KEY)

    try:
        print("Geminiプロンプト送信中...")
        model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
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
