from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from app.core.database import get_db
from app.models.domain import User, Goal
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

class GoalCreate(BaseModel):
    title: str
    target_type: str = "applications"
    target_value: int = 10
    current_value: int = 0
    period: str = "Monthly"

class GoalUpdate(BaseModel):
    current_value: Optional[int] = None
    target_value: Optional[int] = None

@router.get("")
async def get_goals(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Goal).where(Goal.user_id == current_user.id))
    return result.scalars().all()

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_goal(goal_in: GoalCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    goal = Goal(
        user_id=current_user.id,
        title=goal_in.title,
        target_type=goal_in.target_type,
        target_value=goal_in.target_value,
        current_value=goal_in.current_value,
        period=goal_in.period
    )
    db.add(goal)
    await db.commit()
    await db.refresh(goal)
    return goal

@router.patch("/{goal_id}")
async def update_goal(goal_id: str, goal_in: GoalUpdate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Goal).where(Goal.id == goal_id, Goal.user_id == current_user.id))
    goal = result.scalar_one_or_none()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if goal_in.current_value is not None:
        goal.current_value = goal_in.current_value
    if goal_in.target_value is not None:
        goal.target_value = goal_in.target_value
        
    await db.commit()
    await db.refresh(goal)
    return goal

@router.delete("/{goal_id}")
async def delete_goal(goal_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Goal).where(Goal.id == goal_id, Goal.user_id == current_user.id))
    goal = result.scalar_one_or_none()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    await db.delete(goal)
    await db.commit()
    return {"message": "Goal deleted successfully"}
