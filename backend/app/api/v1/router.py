from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, applications, jobs, companies, contacts, interviews, tasks, offers, analytics, goals, notifications, ai
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(applications.router, prefix="/applications", tags=["Applications"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
api_router.include_router(companies.router, prefix="/companies", tags=["Companies"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["Contacts"])
api_router.include_router(interviews.router, prefix="/interviews", tags=["Interviews"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
api_router.include_router(offers.router, prefix="/offers", tags=["Offers"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(goals.router, prefix="/goals", tags=["Goals"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Copilot"])
