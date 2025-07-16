# Technology Stack

## Frontend (pomoapp-frontend)
- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.0
- **Routing**: React Router DOM 7.6.3
- **Styling**: CSS with clsx utility
- **Testing**: Vitest with React Testing Library
- **Code Quality**: ESLint + Prettier

## Backend (pomoapp-backend)
- **Framework**: FastAPI 0.115.13
- **Runtime**: Python 3.9+
- **Server**: Uvicorn 0.33.0
- **Data Validation**: Pydantic 2.11.7
- **Code Quality**: Black (formatter) + Ruff (linter)
- **Testing**: Pytest 8.4.1
- **Environment**: python-dotenv for configuration

## Development Tools
- **Version Control**: Git with GitHub
- **CI/CD**: GitHub Actions (separate workflows for frontend and backend)
- **Package Management**: npm (frontend), pip with virtual environments (backend)

## Common Commands

### Frontend Development
```bash
cd pomoapp-frontend
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Backend Development
```bash
cd pomoapp-backend
python -m venv .venv                    # Create virtual environment
.venv\Scripts\activate                  # Activate venv (Windows)
source .venv/bin/activate              # Activate venv (macOS/Linux)
pip install -r requirements.txt        # Install dependencies
cd app && uvicorn main:app --reload    # Start development server (http://127.0.0.1:8000)
black .                                # Format code
ruff check .                           # Lint code
pytest                                 # Run tests
```

## Code Style
- **Frontend**: ESLint + Prettier with React/TypeScript rules
- **Backend**: Black formatter (88 char line length) + Ruff linter
- **Line Length**: 88 characters for Python, standard for TypeScript