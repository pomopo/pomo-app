from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.api.routes import router as api_router  # ← 追加

load_dotenv()

app = FastAPI()

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要であれば [frontend_origin] に変更
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔐 ログイン処理（暫定的にmain.pyに残すならここ）
USERS = {
    "hisa": "hisa",
    "yama": "yama",
    "aka": "aka",
    "test": "1234",
}

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/login")
def login(req: LoginRequest):
    if USERS.get(req.username) == req.password:
        return {"message": "success"}
    raise HTTPException(status_code=401, detail="ユーザー名またはパスワードが違います")

# ✅ APIルーティングまとめて登録（wordなどを含む）
app.include_router(api_router, prefix="/api")
