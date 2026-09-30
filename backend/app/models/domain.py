import uuid
from datetime import datetime, date
from typing import List, Optional
from sqlalchemy import String, Integer, Float, Boolean, Text, ForeignKey, DateTime, Date, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    target_role: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    experience_level: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    work_preference: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # Remote, Hybrid, Onsite
    weekly_target: Mapped[int] = mapped_column(Integer, default=10)
    role: Mapped[str] = mapped_column(String(50), default="user", index=True) # user, admin, recruiter, coach
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    refresh_token: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    api_key: Mapped[Optional[str]] = mapped_column(String(255), unique=True, index=True, nullable=True)
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="user", cascade="all, delete-orphan")
    jobs: Mapped[List["Job"]] = relationship("Job", back_populates="user", cascade="all, delete-orphan")
    companies: Mapped[List["Company"]] = relationship("Company", back_populates="user", cascade="all, delete-orphan")
    contacts: Mapped[List["Contact"]] = relationship("Contact", back_populates="user", cascade="all, delete-orphan")
    interviews: Mapped[List["Interview"]] = relationship("Interview", back_populates="user", cascade="all, delete-orphan")
    tasks: Mapped[List["Task"]] = relationship("Task", back_populates="user", cascade="all, delete-orphan")
    documents: Mapped[List["Document"]] = relationship("Document", back_populates="user", cascade="all, delete-orphan")
    resumes: Mapped[List["Resume"]] = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    cover_letters: Mapped[List["CoverLetter"]] = relationship("CoverLetter", back_populates="user", cascade="all, delete-orphan")
    offers: Mapped[List["Offer"]] = relationship("Offer", back_populates="user", cascade="all, delete-orphan")
    goals: Mapped[List["Goal"]] = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    notifications: Mapped[List["Notification"]] = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    activities: Mapped[List["Activity"]] = relationship("Activity", back_populates="user", cascade="all, delete-orphan")

class Company(Base):
    __tablename__ = "companies"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    logo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    industry: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    website: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="companies")
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="company")
    contacts: Mapped[List["Contact"]] = relationship("Contact", back_populates="company")

class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    company_logo: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    work_type: Mapped[str] = mapped_column(String(50), default="Remote")  # Remote, Hybrid, Onsite
    salary_min: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    salary_max: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    currency: Mapped[str] = mapped_column(String(10), default="USD")
    experience_level: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    job_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    requirements: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    skills: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)  # Comma separated
    is_saved: Mapped[bool] = mapped_column(Boolean, default=False)
    match_score: Mapped[int] = mapped_column(Integer, default=85)
    posted_date: Mapped[Optional[datetime]] = mapped_column(DateTime, default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="jobs")

class Application(Base):
    __tablename__ = "applications"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    company_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("companies.id", ondelete="SET NULL"), nullable=True)
    job_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("jobs.id", ondelete="SET NULL"), nullable=True)
    
    position: Mapped[str] = mapped_column(String(255), nullable=False)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    company_logo: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="Applied", index=True)  # Wishlist, Applied, Screening, Technical Interview, Final Interview, Offer, Rejected, Withdrawn
    priority: Mapped[str] = mapped_column(String(20), default="Medium")  # Low, Medium, High, Urgent
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    work_type: Mapped[str] = mapped_column(String(50), default="Remote")
    salary_min: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    salary_max: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    currency: Mapped[str] = mapped_column(String(10), default="USD")
    source: Mapped[str] = mapped_column(String(100), default="LinkedIn")  # LinkedIn, Indeed, Referral, Company Site, etc.
    date_applied: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    
    recruiter_id: Mapped[Optional[str]] = mapped_column(String(36), nullable=True)
    hiring_manager_id: Mapped[Optional[str]] = mapped_column(String(36), nullable=True)
    resume_id: Mapped[Optional[str]] = mapped_column(String(36), nullable=True)
    cover_letter_id: Mapped[Optional[str]] = mapped_column(String(36), nullable=True)
    
    next_action: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    next_action_date: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True, index=True)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    favorite: Mapped[bool] = mapped_column(Boolean, default=False)
    archived: Mapped[bool] = mapped_column(Boolean, default=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, index=True)

    user: Mapped["User"] = relationship("User", back_populates="applications")
    company: Mapped[Optional["Company"]] = relationship("Company", back_populates="applications")
    interviews: Mapped[List["Interview"]] = relationship("Interview", back_populates="application", cascade="all, delete-orphan")
    tasks: Mapped[List["Task"]] = relationship("Task", back_populates="application", cascade="all, delete-orphan")
    offers: Mapped[List["Offer"]] = relationship("Offer", back_populates="application", cascade="all, delete-orphan")

class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    company_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("companies.id", ondelete="SET NULL"), nullable=True)
    
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    position: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    company_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    linkedin: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    relationship_type: Mapped[str] = mapped_column(String(50), default="Recruiter")  # Recruiter, Hiring Manager, Employee, Referral, Mentor, Friend, Other
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    last_contacted: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    next_followup: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="contacts")
    company: Mapped[Optional["Company"]] = relationship("Company", back_populates="contacts")

class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    application_id: Mapped[str] = mapped_column(String(36), ForeignKey("applications.id", ondelete="CASCADE"), index=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    interview_type: Mapped[str] = mapped_column(String(50), default="Technical")  # Phone, HR, Technical, Coding, Behavioral, System Design, Managerial, Final
    interviewer_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    scheduled_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=45)
    meeting_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    prep_checklist: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # JSON or newline string
    questions: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="interviews")
    application: Mapped["Application"] = relationship("Application", back_populates="interviews")

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    application_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("applications.id", ondelete="SET NULL"), nullable=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    due_date: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True, index=True)
    priority: Mapped[str] = mapped_column(String(20), default="Medium")  # Low, Medium, High, Urgent
    status: Mapped[str] = mapped_column(String(20), default="To Do")  # To Do, In Progress, Completed
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="tasks")
    application: Mapped[Optional["Application"]] = relationship("Application", back_populates="tasks")

class Document(Base):
    __tablename__ = "documents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(50), default="Resume")  # Resume, Cover Letter, Portfolio, Certificate, Other
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    version: Mapped[str] = mapped_column(String(20), default="v1.0")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="documents")

class Resume(Base):
    __tablename__ = "resumes"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    version: Mapped[str] = mapped_column(String(20), default="v1.0")
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)
    file_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="resumes")

class CoverLetter(Base):
    __tablename__ = "cover_letters"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    company_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    position: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    content: Mapped[Text] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="cover_letters")

class Offer(Base):
    __tablename__ = "offers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    application_id: Mapped[str] = mapped_column(String(36), ForeignKey("applications.id", ondelete="CASCADE"), index=True)
    
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    position: Mapped[str] = mapped_column(String(255), nullable=False)
    base_salary: Mapped[float] = mapped_column(Float, nullable=False)
    bonus: Mapped[Optional[float]] = mapped_column(Float, default=0.0)
    equity: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    currency: Mapped[str] = mapped_column(String(10), default="USD")
    benefits_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    start_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    deadline: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="Pending")  # Pending, Accepted, Declined, Expired
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="offers")
    application: Mapped["Application"] = relationship("Application", back_populates="offers")

class Goal(Base):
    __tablename__ = "goals"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    target_type: Mapped[str] = mapped_column(String(50), nullable=False)  # weekly_applications, monthly_interviews, networking_contacts, learning_hours
    target_value: Mapped[int] = mapped_column(Integer, nullable=False)
    current_value: Mapped[int] = mapped_column(Integer, default=0)
    period: Mapped[str] = mapped_column(String(20), default="Weekly")  # Weekly, Monthly
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="goals")

class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[str] = mapped_column(String(50), default="info")  # interview, task, followup, goal, offer
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="notifications")

class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    action: Mapped[str] = mapped_column(String(255), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(50), nullable=False)  # Application, Interview, Task, Offer, Note
    entity_id: Mapped[Optional[str]] = mapped_column(String(36), nullable=True)
    details: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="activities")
