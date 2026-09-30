from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Company
from app.schemas.schemas import CompanyCreate, CompanyResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[CompanyResponse])
async def get_companies(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Company).where(Company.user_id == current_user.id).order_by(Company.name.asc()))
    return result.scalars().all()

@router.post("", response_model=CompanyResponse, status_code=status.HTTP_201_CREATED)
async def create_company(comp_in: CompanyCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    comp = Company(**comp_in.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(comp)
    await db.commit()
    await db.refresh(comp)
    return comp
