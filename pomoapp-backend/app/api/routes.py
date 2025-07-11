# app/api/routes.py

from fastapi import APIRouter
from . import dashboard

router = APIRouter()

# 各モジュールのrouterを統合
router.include_router(dashboard.router)
