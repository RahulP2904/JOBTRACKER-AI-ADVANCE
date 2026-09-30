from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Interview
from app.schemas.schemas import InterviewCreate, InterviewResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[InterviewResponse])
async def get_interviews(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Interview).where(Interview.user_id == current_user.id).order_by(Interview.scheduled_at.asc()))
    return result.scalars().all()

@router.post("", response_model=InterviewResponse, status_code=status.HTTP_201_CREATED)
async def create_interview(interview_in: InterviewCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    interview = Interview(**interview_in.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(interview)
    await db.commit()
    await db.refresh(interview)
    return interview

@router.patch("/{id}/complete", response_model=InterviewResponse)
async def complete_interview(id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Interview).where(Interview.id == id, Interview.user_id == current_user.id))
    interview = result.scalar_one_or_none()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    interview.is_completed = True
    await db.commit()
    await db.refresh(interview)
    return interview
