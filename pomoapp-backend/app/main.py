from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 管理されるユーザー一覧（username: password）
USERS = {
    "hisa": "hisa",
    "yama": "yama",
    "aka": "aka",
    "test": "1234",  # 追加ユーザー
}

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/login")
def login(req: LoginRequest):
    if USERS.get(req.username) == req.password:
        return {"message": "success"}
    raise HTTPException(status_code=401, detail="ユーザー名またはパスワードが違います")
