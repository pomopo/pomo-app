# Project Structure

## Repository Layout
```
pomo-app/
├── .git/                    # Git repository data
├── .github/                 # GitHub Actions workflows
├── .kiro/                   # Kiro IDE configuration and steering
├── pomoapp-frontend/        # React frontend application
├── pomoapp-backend/         # FastAPI backend application
└── README.md               # Main project documentation
```

## Frontend Structure (pomoapp-frontend/)
```
pomoapp-frontend/
├── src/                    # Source code
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies (generated)
├── index.html              # Main HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc             # Prettier configuration
├── vitest.config.ts        # Test configuration
└── README.md               # Frontend-specific documentation
```

## Backend Structure (pomoapp-backend/)
```
pomoapp-backend/
├── app/                    # Application source code
├── tests/                  # Test files
├── .venv/                  # Python virtual environment (generated)
├── node_modules/           # Node dependencies (generated)
├── .env                    # Environment variables
├── pyproject.toml          # Python project configuration
├── requirements.txt        # Python dependencies
├── package.json            # Node dependencies (minimal)
└── comment.md              # Backend-specific notes
```

## Development Conventions

### File Organization
- **Frontend**: Components and logic in `src/` directory
- **Backend**: Main application code in `app/` directory
- **Tests**: Separate `tests/` directories for each service
- **Configuration**: Root-level config files for each service

### Naming Conventions
- **Directories**: lowercase with hyphens (pomoapp-frontend, pomoapp-backend)
- **Files**: Follow language conventions (camelCase for TS/JS, snake_case for Python)
- **Components**: PascalCase for React components

### Environment Setup
- **Frontend**: Node.js environment with npm
- **Backend**: Python virtual environment with pip
- **Development**: Each service runs independently on different ports
  - Frontend: http://localhost:5173
  - Backend: http://127.0.0.1:8000

### CI/CD Structure
- Separate GitHub Actions workflows for frontend and backend
- Independent testing and deployment pipelines
- Badge status tracking in main README