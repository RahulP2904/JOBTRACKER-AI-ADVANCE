from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models.domain import User, Application, Interview, Offer
from app.schemas.schemas import DashboardMetrics
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("/metrics", response_model=DashboardMetrics)
async def get_dashboard_metrics(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Total Applications
    total_res = await db.execute(select(func.count(Application.id)).where(Application.user_id == current_user.id, Application.archived == False))
    total_apps = total_res.scalar() or 0

    # Active Applications (not rejected, not withdrawn, not offer)
    active_res = await db.execute(
        select(func.count(Application.id)).where(
            Application.user_id == current_user.id,
            Application.archived == False,
            Application.status.not_in(["Rejected", "Withdrawn", "Offer"])
        )
    )
    active_apps = active_res.scalar() or 0

    # Interviews count
    int_res = await db.execute(select(func.count(Interview.id)).where(Interview.user_id == current_user.id))
    interviews_count = int_res.scalar() or 0

    # Offers count
    off_res = await db.execute(select(func.count(Offer.id)).where(Offer.user_id == current_user.id))
    offers_count = off_res.scalar() or 0

    # Response rate calculation (Screening, Interview, Offer, Rejected vs Total)
    responded_res = await db.execute(
        select(func.count(Application.id)).where(
            Application.user_id == current_user.id,
            Application.status.not_in(["Wishlist", "Applied"])
        )
    )
    responded = responded_res.scalar() or 0
    response_rate = round((responded / total_apps * 100), 1) if total_apps > 0 else 0.0

    # Weekly applications count (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    weekly_res = await db.execute(
        select(func.count(Application.id)).where(
            Application.user_id == current_user.id,
            Application.date_applied >= week_ago
        )
    )
    weekly_apps = weekly_res.scalar() or 0

    return DashboardMetrics(
        total_applications=total_apps,
        active_applications=active_apps,
        interviews_count=interviews_count,
        offers_count=offers_count,
        response_rate=response_rate,
        weekly_applications=weekly_apps,
        weekly_target=current_user.weekly_target
    )
