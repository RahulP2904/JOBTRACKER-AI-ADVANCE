from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Contact
from app.schemas.schemas import ContactCreate, ContactResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[ContactResponse])
async def get_contacts(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Contact).where(Contact.user_id == current_user.id).order_by(Contact.name.asc()))
    return result.scalars().all()

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(contact_in: ContactCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    contact = Contact(**contact_in.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    return contact
