from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Notification
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("")
async def get_notifications(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Notification).where(Notification.user_id == current_user.id).order_by(Notification.created_at.desc()))
    return result.scalars().all()

@router.patch("/{id}/read")
async def mark_read(id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Notification).where(Notification.id == id, Notification.user_id == current_user.id))
    notif = result.scalar_one_or_none()
    if notif:
        notif.is_read = True
        await db.commit()
    return {"success": True}
