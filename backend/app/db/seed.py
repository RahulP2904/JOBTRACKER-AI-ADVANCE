import asyncio
from datetime import datetime, timedelta, timezone
from app.core.database import AsyncSessionLocal, engine, Base
from app.core.security import get_password_hash, generate_api_key
from app.models.domain import (
    User, Application, Job, Company, Contact, Interview, Task, Offer, Notification, Activity, Goal
)

async def seed_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        # 1. Create Admin User (Authorizations: Admin Role + Superuser)
        admin_user = User(
            email="admin@jobflow.dev",
            hashed_password=get_password_hash("adminpass123"),
            full_name="System Administrator",
            avatar_url="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            target_role="Engineering Manager / Admin",
            location="San Francisco, CA",
            experience_level="Executive (10+ yrs)",
            work_preference="Remote",
            weekly_target=20,
            role="admin",
            is_active=True,
            is_superuser=True,
            email_verified=True,
            api_key=generate_api_key(),
            last_login_at=datetime.utcnow()
        )
        db.add(admin_user)

        # 2. Create Demo Standard User
        demo_user = User(
            email="rahul@jobflow.dev",
            hashed_password=get_password_hash("password123"),
            full_name="Rahul Sharma",
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            target_role="Senior Full Stack Engineer",
            location="San Francisco, CA (Remote)",
            experience_level="Senior (5+ yrs)",
            work_preference="Remote",
            weekly_target=10,
            role="user",
            is_active=True,
            is_superuser=False,
            email_verified=True,
            api_key=generate_api_key(),
            last_login_at=datetime.utcnow()
        )
        db.add(demo_user)
        await db.flush()

        # Companies
        companies = [
            Company(user_id=demo_user.id, name="Stripe", industry="Fintech", location="San Francisco, CA", website="https://stripe.com", description="Financial infrastructure for the internet."),
            Company(user_id=demo_user.id, name="Vercel", industry="Cloud Platform", location="San Francisco, CA", website="https://vercel.com", description="Develop. Preview. Ship."),
            Company(user_id=demo_user.id, name="Linear", industry="Developer Tools", location="Remote", website="https://linear.app", description="Issue tracking for high performance teams."),
            Company(user_id=demo_user.id, name="Figma", industry="Design Software", location="San Francisco, CA", website="https://figma.com", description="How teams design together."),
            Company(user_id=demo_user.id, name="Notion", industry="Productivity", location="San Francisco, CA", website="https://notion.so", description="The connected workspace."),
            Company(user_id=demo_user.id, name="Airbnb", industry="Hospitality", location="San Francisco, CA", website="https://airbnb.com", description="Vacation rentals & experiences."),
            Company(user_id=demo_user.id, name="Datadog", industry="Observability", location="New York, NY", website="https://datadoghq.com", description="Cloud monitoring & security."),
            Company(user_id=demo_user.id, name="Cloudflare", industry="Cybersecurity", location="San Francisco, CA", website="https://cloudflare.com", description="The Web Performance & Security Company."),
        ]
        db.add_all(companies)
        await db.flush()

        # Demo Applications across stages
        sample_apps = [
            ("Senior Full Stack Architect", "Stripe", "Offer", "High", 185000, 220000, "Referral"),
            ("Lead Frontend Engineer", "Vercel", "Final Interview", "Urgent", 175000, 205000, "LinkedIn"),
            ("Staff Systems Engineer", "Linear", "Technical Interview", "High", 190000, 230000, "Company Site"),
            ("Senior Software Engineer", "Figma", "Screening", "Medium", 165000, 195000, "LinkedIn"),
            ("Principal UI Engineer", "Notion", "Applied", "High", 180000, 215000, "Indeed"),
            ("Senior Backend Developer", "Datadog", "Applied", "Medium", 160000, 190000, "LinkedIn"),
            ("Full Stack Developer", "Cloudflare", "Wishlist", "Low", 150000, 180000, "Recruiter"),
            ("Platform Engineer", "Airbnb", "Rejected", "Medium", 170000, 200000, "LinkedIn"),
        ]

        now = datetime.utcnow()
        for idx, (pos, comp, status_val, prio, min_s, max_s, src) in enumerate(sample_apps):
            app = Application(
                user_id=demo_user.id,
                position=pos,
                company_name=comp,
                status=status_val,
                priority=prio,
                salary_min=min_s,
                salary_max=max_s,
                currency="USD",
                source=src,
                date_applied=now - timedelta(days=idx * 2 + 1),
                next_action=f"Follow up on {pos} round" if status_val != "Rejected" else "Review feedback",
                next_action_date=now + timedelta(days=idx + 1),
                notes=f"Sample tracking notes for {pos} position at {comp}."
            )
            db.add(app)

        # Demo Goals
        goals = [
            Goal(user_id=demo_user.id, title="Apply to 30 companies this month", target_type="applications", target_value=30, current_value=18, period="Monthly"),
            Goal(user_id=demo_user.id, title="Complete 10 technical interviews", target_type="interviews", target_value=10, current_value=4, period="Monthly"),
            Goal(user_id=demo_user.id, title="Network with 20 professionals", target_type="networking_contacts", target_value=20, current_value=12, period="Monthly"),
        ]
        db.add_all(goals)

        await db.commit()
        print("[SUCCESS] Database successfully seeded with schema, Admin authorization, and Demo User!")

if __name__ == "__main__":
    asyncio.run(seed_database())
