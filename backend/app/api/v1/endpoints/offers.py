from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.domain import User, Offer
from app.schemas.schemas import OfferCreate, OfferResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.get("", response_model=List[OfferResponse])
async def get_offers(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Offer).where(Offer.user_id == current_user.id))
    return result.scalars().all()

@router.post("", response_model=OfferResponse, status_code=status.HTTP_201_CREATED)
async def create_offer(offer_in: OfferCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    offer = Offer(**offer_in.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(offer)
    await db.commit()
    await db.refresh(offer)
    return offer
