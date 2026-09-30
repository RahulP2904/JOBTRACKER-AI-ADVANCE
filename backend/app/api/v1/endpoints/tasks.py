from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Task
from app.schemas.schemas import TaskCreate, TaskResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[TaskResponse])
async def get_tasks(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Task).where(Task.user_id == current_user.id).order_by(Task.due_date.asc()))
    return result.scalars().all()

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task_in: TaskCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    task = Task(**task_in.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

@router.patch("/{id}/toggle", response_model=TaskResponse)
async def toggle_task(id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Task).where(Task.id == id, Task.user_id == current_user.id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = "Completed" if task.status != "Completed" else "To Do"
    await db.commit()
    await db.refresh(task)
    return task
