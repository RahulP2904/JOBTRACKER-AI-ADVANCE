from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from datetime import datetime
from app.core.database import get_db
from app.models.domain import User, Application, Activity
from app.schemas.schemas import ApplicationCreate, ApplicationUpdate, ApplicationResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[ApplicationResponse])
async def get_applications(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    search: Optional[str] = None,
    archived: bool = False,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Application).where(
        Application.user_id == current_user.id,
        Application.archived == archived
    )
    if status:
        query = query.where(Application.status == status)
    if priority:
        query = query.where(Application.priority == priority)
    if search:
        term = f"%{search}%"
        query = query.where(
            (Application.position.ilike(term)) | 
            (Application.company_name.ilike(term)) |
            (Application.location.ilike(term))
        )
    
    query = query.order_by(Application.date_applied.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(
    app_in: ApplicationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    app = Application(
        **app_in.model_dump(exclude_unset=True),
        user_id=current_user.id,
        date_applied=app_in.date_applied or datetime.utcnow()
    )
    db.add(app)
    
    # Audit activity log
    activity = Activity(
        user_id=current_user.id,
        action=f"Applied for {app.position} at {app.company_name}",
        entity_type="Application",
        details=f"Status: {app.status}, Source: {app.source}"
    )
    db.add(activity)

    await db.commit()
    await db.refresh(app)
    return app

@router.get("/{id}", response_model=ApplicationResponse)
async def get_application(
    id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Application).where(Application.id == id, Application.user_id == current_user.id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.put("/{id}", response_model=ApplicationResponse)
async def update_application(
    id: str,
    app_in: ApplicationUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Application).where(Application.id == id, Application.user_id == current_user.id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    update_data = app_in.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(app, field, val)

    await db.commit()
    await db.refresh(app)
    return app

@router.patch("/{id}", response_model=ApplicationResponse)
async def patch_application(
    id: str,
    update_data: dict,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Application).where(Application.id == id, Application.user_id == current_user.id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    allowed = {'status', 'priority', 'notes', 'next_action', 'next_action_date', 'favorite', 'archived'}
    for field, val in update_data.items():
        if field in allowed:
            setattr(app, field, val)

    await db.commit()
    await db.refresh(app)
    return app

@router.patch("/{id}/status", response_model=ApplicationResponse)
async def patch_status(
    id: str,
    new_status: str = Query(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Application).where(Application.id == id, Application.user_id == current_user.id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    old_status = app.status
    app.status = new_status
    
    activity = Activity(
        user_id=current_user.id,
        action=f"Updated status of {app.company_name} application from '{old_status}' to '{new_status}'",
        entity_type="Application",
        entity_id=app.id
    )
    db.add(activity)

    await db.commit()
    await db.refresh(app)
    return app


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Application).where(Application.id == id, Application.user_id == current_user.id))
    app = result.scalar_one_or_none()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    await db.delete(app)
    await db.commit()
