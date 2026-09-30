from typing import List, Union
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "JobFlow Premium AI"
    API_V1_STR: str = "/api/v1"
    
    # Security & JWT Authentication
    SECRET_KEY: str = "jobflow-super-secret-key-change-in-production-2026-antigravity"
    REFRESH_SECRET_KEY: str = "jobflow-refresh-secret-key-change-in-production-2026-antigravity"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Database (PostgreSQL with asyncpg driver)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:159951@localhost:5432/jobflow"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    # AI Integration
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
