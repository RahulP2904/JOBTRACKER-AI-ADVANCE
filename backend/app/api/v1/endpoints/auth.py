from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from jose import jwt, JWTError

from app.core.database import get_db
from app.core.config import settings
from app.core.security import (
    verify_password, get_password_hash,
    create_access_token, create_refresh_token, decode_refresh_token,
    generate_api_key
)
from app.models.domain import User
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, TokenResponse, RefreshTokenRequest

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user account")
    return user

async def get_current_active_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin" and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not have sufficient privileges (Admin required)"
        )
    return current_user

@router.post("/register", response_model=TokenResponse)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_in.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role or "user",
        is_active=True,
        email_verified=False
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    access_token = create_access_token(user.id, role=user.role)
    refresh_token = create_refresh_token(user.id)
    user.refresh_token = refresh_token
    await db.commit()

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user)
    )

@router.post("/login", response_model=TokenResponse)
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_in.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is deactivated")

    access_token = create_access_token(user.id, role=user.role)
    refresh_token = create_refresh_token(user.id)

    user.refresh_token = refresh_token
    user.last_login_at = datetime.utcnow()
    await db.commit()

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user)
    )

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: RefreshTokenRequest, db: AsyncSession = Depends(get_db)):
    user_id = decode_refresh_token(request.refresh_token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user or user.refresh_token != request.refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token revoked or invalid")

    new_access_token = create_access_token(user.id, role=user.role)
    new_refresh_token = create_refresh_token(user.id)

    user.refresh_token = new_refresh_token
    await db.commit()

    return TokenResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/api-key", response_model=UserResponse)
async def create_user_api_key(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    current_user.api_key = generate_api_key()
    await db.commit()
    await db.refresh(current_user)
    return current_user

# --- Admin Authorization Endpoints ---

@router.get("/users", response_model=List[UserResponse])
async def list_users_admin(admin: User = Depends(get_current_active_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    return result.scalars().all()

@router.patch("/users/{user_id}/role", response_model=UserResponse)
async def update_user_role(
    user_id: str,
    new_role: str,
    admin: User = Depends(get_current_active_admin),
    db: AsyncSession = Depends(get_db)
):
    if new_role not in ["user", "admin", "recruiter", "coach"]:
        raise HTTPException(status_code=400, detail="Invalid role specified")
    
    result = await db.execute(select(User).where(User.id == user_id))
    target_user = result.scalar_one_or_none()
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    target_user.role = new_role
    await db.commit()
    await db.refresh(target_user)
    return target_user
