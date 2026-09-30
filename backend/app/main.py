import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="JobFlow — Premium Job Tracker SaaS REST API Architecture"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    try:
        # Initialize DB tables for fresh user accounts
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print(f"[SUCCESS] Connected to database: {settings.DATABASE_URL}")
    except Exception as e:
        print(f"[WARNING] Database connection/startup note for {settings.DATABASE_URL}: {e}")

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "database_url": settings.DATABASE_URL,
        "version": "1.0.0"
    }

app.include_router(api_router, prefix=settings.API_V1_STR)
