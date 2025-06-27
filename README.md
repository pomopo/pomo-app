# 開発環境構築手順 (pomo-app リポジトリ)

このガイドは、GitHub の `pomo-app` リポジトリをクローンして開発環境を構築する手順を説明します。

![CI](https://github.com/hmasami/pomo-app.git/actions/workflows/ci.yml/badge.svg)

---

## 下準備

開発環境には以下が必要です：

- Git
- Node.js (v18+)
- Python (3.9+)
- GitHub アカウント

---

## ステップ 1: リポジトリのクローン

### 1. GitHub リポジトリ URL

```
https://github.com/hmasami/pomo-app.git
```

### 2. ターミナルでクローン

例： `C:/projects` にクローンする場合

```bash
cd C:/projects
git clone https://github.com/hmasami/pomo-app.git
```

### 3. クローン後の構成

Windows 勢は C ドライブ直下に`projects`的なフォルダ作ってくろんしてください

```
pomo-app/
├── pomoapp-frontend/  (フロントエンド: React + Vite)
└── pomoapp-backend/   (バックエンド: FastAPI + Python)
```

![image](https://github.com/user-attachments/assets/3c34c1d7-8a82-4cc9-932f-2d235ed17c68)

---

## 次のステップ

各ディレクトリの開発環境構築は別の章第に説明します。

次は `pomoapp-frontend` または `pomoapp-backend` の設定へ進んでください。

## ステップ 2: フロントエンド環境構築

### 1. ディレクトリに移動

```
cd pomo-app/pomoapp-frontend
```

### 2. 依存パッケージのインストール

```
npm install
```

### 3. 開発サーバー起動

```
npm run dev
```

### 4. 確認

ブラウザで http://localhost:5173 を開き、React アプリが表示されれば成功です。

次は pomoapp-backend のセットアップへ進んでください。

---

## ステップ 3: バックエンド環境構築

### 1. ディレクトリに移動

```
cd ../pomoapp-backend
```

### 2. Python 仮想環境の作成

```
python -m venv .venv
```

### 3. 仮想環境の有効化

- Windows:

```
.venv\Scripts\activate
```

- macOS/Linux:

```
source .venv/bin/activate
```

### 4. 必要パッケージのインストール

```
pip install fastapi uvicorn
pip install black flake8
pip uninstall pydantic
pip install pydantic
```

### 5. 依存関係の記録

```
pip freeze > requirements.txt
```

### 6. 動作確認用 API の作成

backend フォルダ直下に`main.py`を作成
main.py を以下の内容で作成：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from backend!"}
```

### 7. サーバー起動

```
uvicorn main:app --reload
```

### 8. 確認

ブラウザで http://127.0.0.1:8000 を開き、{"message": "Hello from backend!"} が表示されれば成功です。
