from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Job
from app.schemas.schemas import JobCreate, JobResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[JobResponse])
async def get_jobs(
    saved_only: bool = False,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Job).where(Job.user_id == current_user.id)
    if saved_only:
        query = query.where(Job.is_saved == True)
    query = query.order_by(Job.posted_date.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_in: JobCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    job = Job(**job_in.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(job)
    await db.commit()
    await db.refresh(job)
    return job

@router.patch("/{id}/save", response_model=JobResponse)
async def toggle_save_job(
    id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Job).where(Job.id == id, Job.user_id == current_user.id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.is_saved = not job.is_saved
    await db.commit()
    await db.refresh(job)
    return job
