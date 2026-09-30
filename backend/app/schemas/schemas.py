from datetime import datetime, date
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

# --- AUTH & USER ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Optional[str] = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    avatar_url: Optional[str] = None
    target_role: Optional[str] = None
    location: Optional[str] = None
    experience_level: Optional[str] = None
    work_preference: Optional[str] = None
    weekly_target: int = 10
    role: str = "user"
    is_active: bool = True
    is_superuser: bool = False
    email_verified: bool = False
    api_key: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    user: UserResponse

class RefreshTokenRequest(BaseModel):
    refresh_token: str

# --- APPLICATION ---
class ApplicationCreate(BaseModel):
    position: str
    company_name: str
    company_logo: Optional[str] = None
    status: str = "Applied"
    priority: str = "Medium"
    location: Optional[str] = None
    work_type: str = "Remote"
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: str = "USD"
    source: str = "LinkedIn"
    date_applied: Optional[datetime] = None
    next_action: Optional[str] = None
    next_action_date: Optional[datetime] = None
    notes: Optional[str] = None
    favorite: bool = False

class ApplicationUpdate(BaseModel):
    position: Optional[str] = None
    company_name: Optional[str] = None
    company_logo: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    location: Optional[str] = None
    work_type: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: Optional[str] = None
    source: Optional[str] = None
    next_action: Optional[str] = None
    next_action_date: Optional[datetime] = None
    notes: Optional[str] = None
    favorite: Optional[bool] = None
    archived: Optional[bool] = None

class ApplicationResponse(BaseModel):
    id: str
    user_id: str
    position: str
    company_name: str
    company_logo: Optional[str] = None
    status: str
    priority: str
    location: Optional[str] = None
    work_type: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: str
    source: str
    date_applied: datetime
    next_action: Optional[str] = None
    next_action_date: Optional[datetime] = None
    notes: Optional[str] = None
    favorite: bool
    archived: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --- JOB ---
class JobCreate(BaseModel):
    title: str
    company_name: str
    company_logo: Optional[str] = None
    location: Optional[str] = None
    work_type: str = "Remote"
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: str = "USD"
    experience_level: Optional[str] = None
    job_url: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    skills: Optional[str] = None

class JobResponse(BaseModel):
    id: str
    title: str
    company_name: str
    company_logo: Optional[str] = None
    location: Optional[str] = None
    work_type: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: str
    experience_level: Optional[str] = None
    job_url: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    skills: Optional[str] = None
    is_saved: bool
    match_score: int
    posted_date: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- COMPANY ---
class CompanyCreate(BaseModel):
    name: str
    logo_url: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None

class CompanyResponse(BaseModel):
    id: str
    name: str
    logo_url: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- CONTACT ---
class ContactCreate(BaseModel):
    name: str
    position: Optional[str] = None
    company_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    relationship_type: str = "Recruiter"
    notes: Optional[str] = None
    last_contacted: Optional[datetime] = None
    next_followup: Optional[datetime] = None

class ContactResponse(BaseModel):
    id: str
    name: str
    position: Optional[str] = None
    company_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    relationship_type: str
    notes: Optional[str] = None
    last_contacted: Optional[datetime] = None
    next_followup: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- INTERVIEW ---
class InterviewCreate(BaseModel):
    application_id: str
    title: str
    interview_type: str = "Technical"
    interviewer_name: Optional[str] = None
    scheduled_at: datetime
    duration_minutes: int = 45
    meeting_url: Optional[str] = None
    location: Optional[str] = None
    prep_checklist: Optional[str] = None
    questions: Optional[str] = None
    notes: Optional[str] = None

class InterviewResponse(BaseModel):
    id: str
    application_id: str
    title: str
    interview_type: str
    interviewer_name: Optional[str] = None
    scheduled_at: datetime
    duration_minutes: int
    meeting_url: Optional[str] = None
    location: Optional[str] = None
    prep_checklist: Optional[str] = None
    questions: Optional[str] = None
    notes: Optional[str] = None
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- TASK ---
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: str = "Medium"
    application_id: Optional[str] = None

class TaskResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: str
    status: str
    application_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- OFFER ---
class OfferCreate(BaseModel):
    application_id: str
    company_name: str
    position: str
    base_salary: float
    bonus: Optional[float] = 0.0
    equity: Optional[str] = None
    currency: str = "USD"
    benefits_summary: Optional[str] = None
    start_date: Optional[date] = None
    deadline: Optional[date] = None
    status: str = "Pending"

class OfferResponse(BaseModel):
    id: str
    application_id: str
    company_name: str
    position: str
    base_salary: float
    bonus: Optional[float] = 0.0
    equity: Optional[str] = None
    currency: str
    benefits_summary: Optional[str] = None
    start_date: Optional[date] = None
    deadline: Optional[date] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- AI COPILOT ---
class AIChatRequest(BaseModel):
    message: str
    context: Optional[dict] = None

class AIChatResponse(BaseModel):
    reply: str
    suggested_actions: Optional[List[str]] = None

# --- DASHBOARD METRICS ---
class DashboardMetrics(BaseModel):
    total_applications: int
    active_applications: int
    interviews_count: int
    offers_count: int
    response_rate: float
    weekly_applications: int
    weekly_target: int
