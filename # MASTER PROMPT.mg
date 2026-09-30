# JOBFLOW — PREMIUM JOB TRACKER SAAS

## MASTER PRODUCT + UI/UX + ENGINEERING PROMPT FOR GOOGLE ANTIGRAVITY

---

# 1. PRIMARY ROLE

You are an elite product engineering team responsible for designing, developing, testing, and polishing a premium Job Tracker SaaS web application called:

**JobFlow**

Tagline:

**"Your entire job search, organized."**

Act simultaneously as:

* Senior Product Manager
* Senior UX/UI Designer
* Design System Architect
* Angular Architect
* Senior TypeScript Engineer
* Senior Python Engineer
* Senior FastAPI Engineer
* PostgreSQL Database Architect
* API Architect
* SaaS Product Designer
* Responsive Web Designer
* Accessibility Engineer
* Data Visualization Engineer
* AI Product Engineer
* QA Engineer
* Security Engineer
* Performance Engineer
* DevOps Engineer

Do not build a basic CRUD application.

Do not create a static dashboard.

Build a complete, interactive, premium job-search management SaaS experience.

The final product should feel like a modern commercial SaaS application.

Every major feature must be functional and connected to the application's data layer.

---

# 2. PRODUCT OBJECTIVE

Build a complete job-search operating system that allows users to manage their entire job-search journey from one place.

The application must allow users to:

* Discover jobs
* Save jobs
* Track applications
* Manage application stages
* Manage interviews
* Manage recruiters
* Manage hiring managers
* Manage networking contacts
* Schedule follow-ups
* Track tasks
* Track deadlines
* Manage resumes
* Manage cover letters
* Store documents
* Track offers
* Track rejections
* Maintain notes
* Analyze job-search activity
* Set career goals
* Receive notifications
* Search their entire workspace
* Use an AI Career Copilot
* View career analytics

The experience must be:

* Premium
* Modern
* Responsive
* Fast
* Accessible
* Interactive
* Consistent
* Professional
* Data-driven

---

# 3. CORE TECHNOLOGY STACK

Use the following technology stack.

## Frontend

Use:

* Angular 18+
* TypeScript
* Angular Router
* Angular Signals
* RxJS

## Styling

Use:

* Tailwind CSS
* CSS custom properties/design tokens
* Angular Material where appropriate
* Angular CDK

Do not rely entirely on Angular Material's default visual appearance.

Create a custom premium visual system.

## Icons

Use:

* Lucide Angular

Use one consistent icon family throughout the application.

## Charts

Use:

* Apache ECharts

Create interactive, responsive analytics charts.

## Animation

Use:

* Angular animations
* CSS transitions
* Motion-style micro-interactions where appropriate

Do not over-animate the interface.

## Backend

Use:

* Python
* FastAPI
* Pydantic
* SQLAlchemy 2.x
* Alembic

## Database

Use:

* PostgreSQL

## Authentication

Use:

* JWT
* OAuth2-compatible architecture
* Argon2 password hashing

## Cache/background processing

Use:

* Redis
* Celery or ARQ where appropriate

## File storage

Design the application to support:

* AWS S3
* Cloudinary

For local development, provide a simulated/local storage implementation where necessary.

## Testing

Frontend:

* Angular testing tools
* Playwright

Backend:

* Pytest

API:

* Postman/OpenAPI

## DevOps

Use:

* Docker
* Docker Compose
* GitHub Actions

## Monitoring

Use:

* Sentry-ready architecture

## AI

Create an AI-ready architecture for:

* OpenAI API
* Google Gemini API

Do not expose API keys in frontend code.

---

# 4. ARCHITECTURE

Use a clean full-stack architecture.

```text
JOBFLOW
│
├── Angular Frontend
│   ├── TypeScript
│   ├── Tailwind CSS
│   ├── Angular Material/CDK
│   ├── Lucide
│   ├── ECharts
│   ├── Signals
│   └── RxJS
│
├── FastAPI Backend
│   ├── REST API
│   ├── Authentication
│   ├── Pydantic
│   ├── SQLAlchemy
│   ├── Alembic
│   └── Business Logic
│
├── PostgreSQL
│   ├── Users
│   ├── Applications
│   ├── Jobs
│   ├── Companies
│   ├── Contacts
│   ├── Interviews
│   ├── Tasks
│   ├── Documents
│   ├── Offers
│   ├── Goals
│   └── Notifications
│
├── Redis
│   ├── Cache
│   └── Background Tasks
│
├── Object Storage
│   └── Resumes/Documents
│
└── AI Layer
    ├── Career Copilot
    ├── Job Matching
    ├── Job Summary
    └── Interview Assistance
```

Keep the frontend and backend clearly separated.

Do not put database logic in Angular components.

Do not put UI logic inside FastAPI routes.

---

# 5. DESIGN DIRECTION

The visual style must be:

* Premium
* Minimal
* Modern
* Sophisticated
* SaaS-oriented
* Professional
* Clean
* Data-rich
* Highly responsive

Take inspiration from modern SaaS products without copying their branding.

Do not copy the exact UI of any existing company.

Create an original JobFlow visual identity.

---

# 6. VISUAL STYLE

Use:

* Soft neutral backgrounds
* White/dark surfaces
* Subtle borders
* Soft shadows
* Rounded cards
* Strong typography
* Clear spacing
* Minimal gradients
* Modern iconography
* Subtle micro-interactions

Avoid:

* Excessive gradients
* Neon colors
* Gaming-style UI
* Excessive glassmorphism
* Huge unnecessary headings
* Excessive animations
* Cluttered dashboards

The interface must look professional enough for a commercial SaaS product.

---

# 7. COLOR SYSTEM

Use a sophisticated color system.

Primary:

Modern blue/indigo.

Supporting:

* Success green
* Warning amber
* Danger red
* Information cyan/blue

Neutral:

* Slate
* Gray
* White
* Near-black

Use colors primarily for:

* Status
* Priority
* Notifications
* Important metrics
* Actions

Do not make every UI element colorful.

---

# 8. DESIGN SYSTEM

Create reusable design tokens.

Define:

* Colors
* Typography
* Spacing
* Border radius
* Shadows
* Transitions
* Breakpoints
* Component states

Use CSS variables where appropriate.

Do not scatter random styling values throughout the application.

---

# 9. TYPOGRAPHY

Use a modern sans-serif font.

Create typography levels:

* Display
* H1
* H2
* H3
* H4
* Body
* Small
* Caption
* Numeric KPI

Prioritize readability.

---

# 10. RESPONSIVE REQUIREMENT

This is a critical requirement.

The entire website must be responsive.

Support:

* 320px
* 375px
* 414px
* 640px
* 768px
* 1024px
* 1280px
* 1440px
* 1536px+

Do not simply shrink desktop layouts.

Create intentional responsive layouts.

---

# 11. MOBILE EXPERIENCE

On mobile:

Use:

* Mobile header
* Hamburger menu
* Bottom navigation
* Mobile-friendly cards
* Full-width forms
* Touch-friendly controls
* Mobile bottom sheets
* Horizontal Kanban scrolling
* Responsive charts

Bottom navigation:

* Home
* Applications
* Calendar
* Tasks
* More

---

# 12. DESKTOP EXPERIENCE

Desktop should contain:

* Collapsible sidebar
* Top navigation
* Main content area
* Optional right-side contextual panels

Sidebar must support:

Expanded mode

Collapsed icon mode

Mobile drawer mode

---

# 13. APPLICATION SHELL

Create:

AppShell

Sidebar

Topbar

MobileNav

PageHeader

Breadcrumbs

ContentContainer

NotificationCenter

ProfileMenu

GlobalSearch

QuickAdd

---

# 14. SIDEBAR

Sidebar categories:

WORKSPACE

* Dashboard
* Applications
* Kanban
* Jobs
* Calendar

CAREER

* Interviews
* Companies
* Contacts
* Networking
* Documents

INSIGHTS

* Analytics
* Goals

BOTTOM

* Notifications
* Help
* Settings
* Profile

Display active navigation state clearly.

---

# 15. TOPBAR

Topbar contains:

* Global search
* Quick Add
* Notifications
* Help
* User avatar

Search keyboard shortcut:

Ctrl + K

Quick Add keyboard shortcut:

N

---

# 16. GLOBAL SEARCH

Search across:

* Applications
* Jobs
* Companies
* Contacts
* Notes
* Interviews

Show categorized search results.

Support:

* Keyboard navigation
* Enter to open
* Escape to close
* Recent searches

---

# 17. COMMAND PALETTE

Create a premium command palette.

Commands:

* Go to Dashboard
* Go to Applications
* Add Application
* Add Job
* Add Contact
* Add Task
* Schedule Interview
* Open Calendar
* Open Analytics
* Open Settings
* Logout

---

# 18. QUICK ADD

Create a universal Quick Add modal.

Options:

* Application
* Job
* Company
* Contact
* Interview
* Task
* Reminder
* Note
* Document

The Quick Add interface must be fast.

The user should be able to create an application in less than one minute.

---

# 19. LANDING PAGE

Create a premium marketing landing page.

Hero:

"Take control of your job search."

Supporting text:

"Track applications, interviews, follow-ups, networking and career progress from one intelligent workspace."

Buttons:

Start Tracking Free

Explore Demo

Include:

* Navigation
* Hero
* Product preview
* Feature section
* Workflow
* Analytics preview
* Testimonials
* Pricing
* FAQ
* Footer

---

# 20. AUTHENTICATION

Create:

* Login
* Register
* Forgot Password
* Reset Password

Login:

* Email
* Password
* Remember me
* Login
* Google login UI

Register:

* Full name
* Email
* Password
* Confirm password

Include:

* Validation
* Password strength
* Loading state
* Error state
* Success state

---

# 21. DEMO AUTHENTICATION

If external authentication is unavailable:

Create a simulated authentication system.

Persist authentication state.

Protect application routes.

Redirect unauthenticated users to:

/login

Preserve the return URL.

---

# 22. ONBOARDING

After registration:

Step 1:

Target role

Step 2:

Experience

Step 3:

Preferred location

Step 4:

Work preference

Step 5:

Industries

Step 6:

Job-search goal

Step 7:

Weekly application target

Step 8:

Complete setup

Include:

* Progress indicator
* Back
* Continue
* Skip
* Completion state

---

# 23. DASHBOARD

Create the primary JobFlow dashboard.

Header:

"Good morning, Rahul 👋"

Subtitle:

"Here's your job-search overview."

Display:

* Search activity
* Applications
* Interviews
* Offers
* Follow-ups
* Goals

---

# 24. DASHBOARD KPI CARDS

Create:

Total Applications

Active Applications

Interviews

Offers

Response Rate

Applications This Week

Each card contains:

* Icon
* Metric
* Change
* Comparison
* Mini visualization
* Tooltip

Metrics must be dynamically calculated.

---

# 25. APPLICATION PIPELINE

Create visual pipeline:

Wishlist

Applied

Screening

Interview

Final Interview

Offer

Rejected

Withdrawn

Show:

* Number of applications
* Percentage
* Trend

Clicking a stage should filter applications.

---

# 26. RECENT ACTIVITY

Display:

* Application created
* Application status changed
* Interview scheduled
* Task completed
* Note added
* Follow-up created
* Offer received

Each item contains:

* Icon
* Description
* Timestamp
* Related entity

---

# 27. UPCOMING

Display:

* Interviews
* Tasks
* Follow-ups
* Deadlines

Show:

* Date
* Time
* Company
* Position
* Action

---

# 28. GOALS WIDGET

Show:

Weekly applications

Monthly interviews

Networking target

Learning target

Use progress indicators.

---

# 29. APPLICATIONS PAGE

Create a professional application management interface.

Features:

* Search
* Filters
* Sorting
* View selector
* Add application

Views:

* Table
* List
* Kanban
* Compact

---

# 30. APPLICATION TABLE

Columns:

* Company
* Position
* Status
* Location
* Applied Date
* Salary
* Priority
* Recruiter
* Next Action
* Updated

Support:

* Sorting
* Filtering
* Column visibility
* Row selection
* Bulk actions

---

# 31. BULK ACTIONS

Support:

* Change status
* Add tag
* Archive
* Delete
* Export

Always display affected record count.

---

# 32. KANBAN

Create a premium drag-and-drop Kanban.

Columns:

Wishlist

Applied

Screening

Technical Interview

Final Interview

Offer

Rejected

Cards contain:

* Company logo
* Position
* Location
* Salary
* Applied date
* Priority
* Next action

Use Angular CDK DragDrop.

---

# 33. KANBAN BEHAVIOR

When card moves:

Update:

* Application status
* Activity log
* Pipeline count
* Dashboard metrics
* Analytics
* Application detail

Show toast:

"Application moved to Interview."

---

# 34. APPLICATION DETAIL

Create a detailed application workspace.

Header:

* Company logo
* Position
* Company
* Status
* Priority
* Favorite
* Edit

Information:

* Job title
* Company
* Location
* Work type
* Salary
* Job URL
* Source
* Date posted
* Date applied
* Recruiter
* Hiring manager

---

# 35. APPLICATION TIMELINE

Timeline events:

Application created

Application submitted

Recruiter contacted

Screening

Technical interview

Final interview

Offer

Rejection

Allow adding custom events.

---

# 36. APPLICATION NOTES

Features:

* Create note
* Edit note
* Delete note
* Pin note
* Search notes

Support timestamps.

---

# 37. JOBS PAGE

Create a job discovery interface.

Job cards:

* Company
* Logo
* Position
* Location
* Salary
* Work type
* Experience
* Posted date
* Match score
* Save

---

# 38. JOB FILTERS

Filters:

* Keyword
* Location
* Remote
* Hybrid
* On-site
* Salary
* Experience
* Employment type
* Industry
* Company
* Posted date

Allow multiple filters.

Display filter chips.

---

# 39. JOB DETAIL

Display:

* Job title
* Company
* Logo
* Location
* Salary
* Description
* Responsibilities
* Requirements
* Skills
* Benefits

Actions:

* Apply
* Save
* Track
* Add note
* Share

---

# 40. JOB APPLICATION FLOW

Create:

Find Job

↓

Save Job

↓

Track Application

↓

Choose Resume

↓

Choose Cover Letter

↓

Set Follow-up

↓

Create Application

Show success confirmation.

---

# 41. COMPANY MANAGEMENT

Companies page:

* Company name
* Logo
* Industry
* Location
* Website
* Application count
* Interview count
* Offer count

Company detail:

* Overview
* Applications
* Contacts
* Interviews
* Notes
* Activity

---

# 42. CONTACT MANAGEMENT

Contact fields:

* Name
* Position
* Company
* Email
* Phone
* LinkedIn
* Relationship
* Notes
* Last contacted
* Next follow-up

Relationship types:

* Recruiter
* Hiring Manager
* Employee
* Referral
* Mentor
* Friend
* Other

---

# 43. NETWORKING

Networking dashboard:

Metrics:

* Total contacts
* New contacts
* Follow-ups
* Conversations
* Referrals

Track:

* LinkedIn message
* Email
* Coffee chat
* Referral
* Introduction
* Career event

---

# 44. INTERVIEWS

Interview management page.

Types:

* Phone
* HR
* Technical
* Coding
* Behavioral
* System Design
* Managerial
* Final

Fields:

* Company
* Position
* Interviewer
* Date
* Time
* Meeting URL
* Type
* Notes

---

# 45. INTERVIEW DETAIL

Show:

* Countdown
* Company
* Position
* Interviewer
* Meeting link
* Type
* Preparation checklist
* Notes
* Questions

Actions:

Mark completed

Reschedule

Add note

---

# 46. INTERVIEW PREPARATION

Checklist:

* Research company
* Review job description
* Prepare introduction
* Prepare STAR stories
* Review technical concepts
* Prepare questions
* Test microphone
* Test camera

Show completion percentage.

---

# 47. INTERVIEW QUESTIONS

Allow storing:

Behavioral questions

Technical questions

Coding questions

System Design questions

HR questions

Allow notes and answers.

---

# 48. CALENDAR

Create:

Month view

Week view

Day view

Events:

* Interviews
* Follow-ups
* Tasks
* Deadlines
* Application events

Click event to open details.

---

# 49. TASK MANAGEMENT

Fields:

* Title
* Description
* Due date
* Priority
* Related application
* Related company
* Status

Statuses:

To Do

In Progress

Completed

Priorities:

Low

Medium

High

Urgent

---

# 50. REMINDERS

Reminder types:

* Recruiter follow-up
* Application deadline
* Interview preparation
* Thank-you message
* Resume update

Display overdue reminders.

---

# 51. DOCUMENTS

Document categories:

* Resume
* Cover Letter
* Portfolio
* Certificate
* Other

Display:

* Name
* Type
* Version
* Last updated
* Related application

---

# 52. RESUME MANAGEMENT

Support multiple resumes.

Examples:

* Software Engineer Resume
* Frontend Resume
* Backend Resume
* Data Analyst Resume

Actions:

* Upload
* Rename
* Duplicate
* Delete
* Set default
* Associate application

---

# 53. COVER LETTER MANAGEMENT

Support:

* Create
* Edit
* Duplicate
* Delete
* Associate with application

Display:

* Company
* Position
* Date
* Status

---

# 54. OFFERS

Offer fields:

* Company
* Position
* Base salary
* Bonus
* Equity
* Benefits
* Start date
* Deadline
* Status

Statuses:

Pending

Accepted

Declined

Expired

Create offer comparison.

---

# 55. ANALYTICS

Create a premium analytics dashboard.

Metrics:

* Applications
* Response rate
* Interview rate
* Offer rate
* Rejection rate
* Average response time
* Weekly applications
* Monthly interviews

---

# 56. ANALYTICS CHARTS

Use Apache ECharts.

Create:

Applications over time

Application funnel

Applications by source

Applications by location

Applications by company

Interview conversion

Response rate trend

Salary distribution

---

# 57. ANALYTICS DATE FILTER

Support:

7 days

30 days

90 days

6 months

1 year

All time

Charts must update dynamically.

---

# 58. ANALYTICS CALCULATIONS

Response rate:

Responses / Applications × 100

Interview rate:

Interviews / Applications × 100

Offer rate:

Offers / Applications × 100

Do not hardcode these values.

---

# 59. CAREER GOALS

Allow:

Weekly application goal

Monthly interview goal

Networking goal

Learning goal

Resume improvement goal

Show:

Current

Target

Percentage

Remaining

---

# 60. NOTIFICATIONS

Notification types:

* Interview tomorrow
* Follow-up due
* Task due
* Application updated
* Goal reached
* Offer deadline

Support:

* Mark read
* Mark unread
* Mark all read
* Delete

---

# 61. PROFILE

Profile fields:

* Name
* Photo
* Email
* Target role
* Location
* Experience
* Skills
* Work preference

---

# 62. SETTINGS

Sections:

Account

Appearance

Notifications

Preferences

Privacy

Data

Integrations

---

# 63. DARK MODE

Implement a proper dark theme.

Do not simply invert colors.

Dark mode must have:

* Proper contrast
* Dark surfaces
* Appropriate borders
* Correct shadows
* Correct chart colors
* Accessible text

Persist theme preference.

---

# 64. THEME MODES

Support:

Light

Dark

System

---

# 65. DATA MODEL

Create PostgreSQL entities:

User

Application

Job

Company

Contact

Interview

Task

Reminder

Document

Resume

CoverLetter

Offer

Note

Goal

Notification

Activity

NetworkingEvent

Tag

---

# 66. APPLICATION MODEL

Application fields:

id

user_id

job_id

company_id

position

status

priority

location

work_type

salary_min

salary_max

currency

source

date_applied

recruiter_id

hiring_manager_id

next_action

next_action_date

resume_id

cover_letter_id

notes

favorite

archived

created_at

updated_at

---

# 67. DATABASE DESIGN

Use:

* Proper foreign keys
* Indexes
* Constraints
* Timestamps
* UUIDs where appropriate

Avoid unnecessary duplication.

Normalize relational data.

---

# 68. DATABASE INDEXING

Create indexes for frequently queried fields:

user_id

status

company_id

date_applied

created_at

updated_at

next_action_date

Do not create unnecessary indexes.

---

# 69. FASTAPI ARCHITECTURE

Organize backend:

app/

main.py

core/

config.py

security.py

database.py

models/

schemas/

api/

services/

repositories/

middleware/

utils/

tasks/

---

# 70. API ROUTES

Create REST endpoints for:

/auth

/users

/applications

/jobs

/companies

/contacts

/interviews

/tasks

/reminders

/documents

/resumes

/cover-letters

/offers

/analytics

/goals

/notifications

/networking

---

# 71. APPLICATION API

Create:

GET /applications

GET /applications/{id}

POST /applications

PUT /applications/{id}

PATCH /applications/{id}

DELETE /applications/{id}

PATCH /applications/{id}/status

POST /applications/{id}/notes

---

# 72. API VALIDATION

Use Pydantic models.

Validate:

* Required fields
* Email
* URLs
* Dates
* Numeric salary
* Enum values
* String lengths

---

# 73. AUTHORIZATION

Users must only access their own data.

Every protected endpoint must verify the authenticated user.

Do not trust user IDs from frontend requests.

---

# 74. PASSWORD SECURITY

Never store plain-text passwords.

Use Argon2.

---

# 75. JWT SECURITY

Use secure JWT architecture.

Configure:

* Access token
* Refresh token
* Expiration
* Secure handling

Never place secrets directly in source code.

---

# 76. ENVIRONMENT VARIABLES

Use environment variables for:

Database URL

JWT secret

Redis URL

S3 credentials

AI API keys

Sentry DSN

Never commit secrets.

---

# 77. REDIS

Use Redis for:

* Caching
* Rate limiting where appropriate
* Background task coordination
* Temporary state

---

# 78. BACKGROUND JOBS

Use Celery or ARQ for:

* Reminder processing
* Scheduled notifications
* Analytics processing
* Email preparation
* Cleanup tasks

---

# 79. FILE UPLOADS

Support:

* Resume
* Cover letter
* Portfolio
* Certificate

Validate:

* File type
* File size
* File name

Store files securely.

---

# 80. SEARCH

Initial search:

PostgreSQL Full-Text Search.

Search:

* Jobs
* Companies
* Applications
* Contacts
* Notes

Keep architecture extensible for OpenSearch/Elasticsearch later.

---

# 81. AI CAREER COPILOT

Create an AI-ready feature called:

"Career Copilot"

Interface:

Chat panel.

Suggested prompts:

"Analyze my application pipeline."

"Which applications need follow-up?"

"Help me prepare for my next interview."

"Summarize this job description."

"Create interview questions for this role."

"Identify skills mentioned across my saved jobs."

---

# 82. AI SAFETY

Do not claim AI analysis if it is only simulated.

If no AI API is configured:

Use local/demo responses.

Clearly distinguish:

Demo AI

from

Live AI.

Never expose API keys in Angular.

AI calls should go through FastAPI.

---

# 83. JOB MATCHING

Create a demo matching system.

Possible inputs:

* Skills
* Experience
* Job keywords
* Location
* Work type

Show:

"92% Match"

Label this as a simulated/demo score unless backed by a real algorithm.

---

# 84. ACTIVITY SYSTEM

Track:

Application created

Application updated

Status changed

Interview scheduled

Interview completed

Task completed

Note added

Follow-up created

Offer received

Document uploaded

---

# 85. STATE MANAGEMENT

Use Angular Signals and RxJS.

Centralize application state.

If an application changes:

Update:

Dashboard

Kanban

Application list

Analytics

Activity

Notifications where appropriate

Do not maintain disconnected duplicate state.

---

# 86. FRONTEND SERVICES

Create services:

AuthService

ApplicationService

JobService

CompanyService

ContactService

InterviewService

TaskService

ReminderService

DocumentService

ResumeService

CoverLetterService

OfferService

AnalyticsService

GoalService

NotificationService

SearchService

StorageService

AiService

---

# 87. COMPONENT ARCHITECTURE

Create reusable shared components:

Button

Input

Select

Modal

Dropdown

Toast

Badge

Card

Table

Tabs

Tooltip

Skeleton

EmptyState

Pagination

DatePicker

StatCard

Timeline

---

# 88. FEATURE COMPONENTS

Create:

DashboardStats

PipelineOverview

RecentActivity

UpcomingEvents

ApplicationTable

ApplicationFilters

ApplicationKanban

ApplicationCard

ApplicationDetails

JobCard

JobFilters

CompanyCard

ContactCard

InterviewCard

AnalyticsCharts

GoalProgress

---

# 89. LOADING STATES

Every major page must have skeleton loaders.

Create skeletons for:

* Dashboard
* Applications
* Jobs
* Companies
* Contacts
* Interviews
* Analytics

Do not show empty white screens.

---

# 90. EMPTY STATES

Every major feature must have a meaningful empty state.

Example:

"No applications yet."

"Add your first application to start building your job pipeline."

Button:

"Add Application"

---

# 91. ERROR STATES

Create reusable error UI.

Example:

"Something went wrong."

"Unable to load applications."

Buttons:

Retry

Go Back

Do not expose raw stack traces.

---

# 92. TOAST SYSTEM

Create reusable toast notifications.

Examples:

Application added successfully.

Application moved to Interview.

Changes saved.

Resume uploaded.

Task completed.

---

# 93. FORM DESIGN

Every form must contain:

* Label
* Input
* Validation
* Error message
* Required state
* Loading state
* Success state

Do not rely only on placeholders.

---

# 94. RESPONSIVE FORMS

Desktop:

Two-column where appropriate.

Mobile:

Single-column.

Touch-friendly controls.

---

# 95. TABLE RESPONSIVENESS

Desktop:

Full table.

Tablet:

Reduced columns.

Mobile:

Convert rows into cards.

Do not create unusable tiny tables.

---

# 96. KANBAN RESPONSIVENESS

Desktop:

Multiple columns.

Tablet:

Horizontal scrolling.

Mobile:

Horizontal scrolling with readable cards.

---

# 97. ACCESSIBILITY

Follow accessibility best practices.

Include:

Semantic HTML

Keyboard navigation

Focus states

ARIA labels

Accessible modals

Accessible forms

Color contrast

Screen-reader support

---

# 98. ACCESSIBLE STATUS

Never communicate status using color alone.

Use:

Icon + text + color.

---

# 99. MICRO INTERACTIONS

Implement subtle:

Hover

Focus

Press

Loading

Success

Drag

Modal

Dropdown

Page transition

animations.

Keep animations professional.

---

# 100. REDUCED MOTION

Respect:

prefers-reduced-motion

Reduce non-essential animation.

---

# 101. KEYBOARD SHORTCUTS

Implement:

Ctrl + K

Global search

N

New application

G then D

Dashboard

G then A

Applications

G then C

Calendar

Esc

Close modal

---

# 102. URL FILTER STATE

Allow application filters to be represented in query parameters.

Example:

/applications?status=interview&priority=high

---

# 103. SORTING

Support:

Newest

Oldest

Company A-Z

Salary high-low

Salary low-high

Priority

Next action date

---

# 104. PAGINATION

For large datasets:

Use pagination or virtual scrolling.

Display:

Current page

Total results

Page size

---

# 105. EXPORT

Allow exporting applications to:

CSV

JSON

Generate files client-side or through FastAPI.

---

# 106. IMPORT

Allow CSV import.

Flow:

Upload

↓

Preview

↓

Validate

↓

Import

↓

Success summary

---

# 107. DEMO DATA

Provide realistic demo data.

At least:

30 applications

20 jobs

15 companies

15 contacts

10 interviews

20 tasks

15 notifications

5 offers

20 activities

Use fictional or clearly demo-labelled data where appropriate.

Do not imply demo data represents real user activity.

---

# 108. DEMO MODE

On first launch:

Allow:

Explore Demo

or

Start from Scratch

Provide:

Reset Demo Data

under Settings.

---

# 109. PERSISTENCE

Use PostgreSQL for production architecture.

If backend is unavailable during frontend-only development:

Provide a temporary mock service/local persistence layer.

The frontend must be architected so mock services can later be replaced by FastAPI APIs.

---

# 110. NO DEAD BUTTONS

Every primary button must perform an action.

Do not create decorative buttons that do nothing.

---

# 111. NO DEAD ROUTES

Every visible navigation item must lead to a functional page.

---

# 112. DELETE FLOW

Destructive actions must require confirmation.

Example:

"Delete this application?"

Buttons:

Cancel

Delete

---

# 113. ARCHIVE

Allow applications to be archived.

Archived applications should not appear in the default list.

Allow restoring.

---

# 114. FAVORITES

Allow users to favorite important applications.

Add:

Favorites filter.

---

# 115. TAGS

Support custom tags:

Frontend

Backend

Remote

Referral

Dream Role

Urgent

Follow-up

Internship

Allow:

Create

Edit

Delete

Filter

---

# 116. FOLLOW-UP

Application follow-up fields:

Date

Contact

Method

Message

Reminder

Show follow-up history.

---

# 117. REMINDER LOGIC

Allow users to create reminders.

Show overdue reminders.

Display upcoming reminders on Dashboard and Calendar.

---

# 118. INTERVIEW COUNTDOWN

If an interview is upcoming:

Calculate real countdown.

Examples:

Interview tomorrow

Interview in 2 days

Interview today at 3:00 PM

---

# 119. DATE HANDLING

Use consistent formatting.

Example:

Sep 23, 2026

Relative:

Today

Yesterday

2 days ago

Tomorrow

Respect timezone.

---

# 120. DASHBOARD CUSTOMIZATION

Allow users to show/hide widgets.

Widgets:

* KPI
* Pipeline
* Activity
* Upcoming
* Goals
* Analytics
* Tasks

Persist preferences.

---

# 121. PRODUCTIVITY INSIGHTS

Generate factual insights from available data.

Examples:

"You submitted 12 applications this week."

"You have 3 follow-ups due."

"Your interview count increased this month."

Do not make unsupported claims.

---

# 122. APPLICATION FUNNEL

Display:

Jobs Saved

Applications

Responses

Screenings

Interviews

Offers

Show conversion percentages based on actual data.

---

# 123. SOURCE ANALYTICS

Sources:

LinkedIn

Naukri

Indeed

Company Website

Referral

Recruiter

Career Fair

Other

Display chart.

---

# 124. LOCATION ANALYTICS

Show:

Remote

Hybrid

Onsite

Location distribution.

---

# 125. SALARY ANALYTICS

Show:

Minimum

Maximum

Average

Currency

Only calculate using available salary data.

---

# 126. INTERVIEW ANALYTICS

Show:

Interview count

Interview rate

Technical interviews

HR interviews

Final interviews

Offers after interviews

---

# 127. APPLICATION PRIORITY

Support:

Low

Medium

High

Urgent

Use subtle visual indicators.

---

# 128. RECENTLY VIEWED

Track recently viewed:

Applications

Jobs

Companies

Display in relevant search/dashboard areas.

---

# 129. BREADCRUMBS

Detail pages:

Applications > Software Engineer > Company

Jobs > Backend Developer > Company

Companies > Company Name

---

# 130. MOBILE BOTTOM SHEETS

On mobile:

Use bottom sheets for:

* Filters
* Quick actions
* Application actions
* Sort options

---

# 131. MOBILE MENU

Mobile drawer should contain all navigation.

Close drawer after route navigation.

---

# 132. LARGE SCREEN

Use maximum content width.

Do not stretch every component across huge monitors.

Maintain readable layouts.

---

# 133. PERFORMANCE

Optimize:

* Lazy-loaded routes
* Images
* Lists
* Charts
* API calls
* Search
* State updates

Use efficient rendering.

---

# 134. SEARCH PERFORMANCE

Debounce search input.

Avoid unnecessary API requests.

---

# 135. SECURITY

Protect against:

* Unsafe HTML
* Injection
* Unauthorized API access
* Exposed secrets
* Invalid uploads

Validate both frontend and backend.

---

# 136. API RATE LIMITING

Where appropriate, implement rate limiting for:

* Authentication
* Search
* AI endpoints
* Sensitive operations

---

# 137. DATABASE TRANSACTIONS

Use transactions for multi-step operations.

Example:

Creating application + timeline event + activity.

---

# 138. API ERROR FORMAT

Create consistent API error responses.

Example:

```json
{
  "success": false,
  "message": "Application not found",
  "code": "APPLICATION_NOT_FOUND"
}
```

---

# 139. API SUCCESS FORMAT

Use consistent response structure where appropriate.

```json
{
  "success": true,
  "data": {}
}
```

---

# 140. API DOCUMENTATION

Generate OpenAPI documentation automatically through FastAPI.

Ensure endpoints have:

* Descriptions
* Request schemas
* Response schemas
* Error responses

---

# 141. FRONTEND API LAYER

Create a centralized HTTP/API layer.

Do not make random HTTP requests from every component.

Use services.

---

# 142. AUTH INTERCEPTOR

Implement an HTTP interceptor for:

* Access token handling
* Authorization headers
* Error handling
* Refresh flow where appropriate

---

# 143. ROUTE GUARDS

Implement:

AuthGuard

GuestGuard where appropriate

---

# 144. DATABASE MIGRATIONS

Use Alembic.

Do not manually modify production schema.

---

# 145. SEED DATA

Create database seed functionality.

Command should create:

* Demo user
* Demo applications
* Demo jobs
* Demo companies
* Demo contacts
* Demo interviews
* Demo tasks
* Demo offers

---

# 146. DOCKER

Create:

Dockerfile frontend if appropriate

Dockerfile backend

docker-compose.yml

Services:

frontend

backend

postgres

redis

---

# 147. ENVIRONMENT CONFIGURATION

Provide:

.env.example

Never commit:

.env

Secrets

API keys

Passwords

---

# 148. TESTING STRATEGY

Backend:

Pytest

Frontend:

Angular unit/component tests

E2E:

Playwright

API:

Postman/OpenAPI

---

# 149. CRITICAL E2E FLOWS

Playwright tests should cover:

Register

Login

Dashboard

Add Application

Edit Application

Delete Application

Change Application Status

Kanban drag/drop

Search

Filtering

Interview creation

Task creation

Dark mode

Logout

---

# 150. BACKEND TESTS

Test:

Authentication

Authorization

Applications

Jobs

Companies

Contacts

Interviews

Tasks

Offers

Analytics

---

# 151. RESPONSIVE TESTING

Test:

320px

375px

414px

768px

1024px

1440px

---

# 152. VISUAL QA

Inspect:

Spacing

Alignment

Typography

Overflow

Icons

Charts

Buttons

Cards

Tables

Mobile layout

Dark mode

---

# 153. CONSOLE QA

Before finalizing:

Fix TypeScript errors.

Fix Angular template errors.

Fix runtime errors.

Fix routing errors.

Fix API errors.

Fix accessibility warnings where practical.

Do not leave avoidable console errors.

---

# 154. ERROR RECOVERY

If API fails:

Show friendly message.

Allow retry.

Do not crash the entire application.

---

# 155. OFFLINE-FRIENDLY UX

Where practical:

Cache recently used data.

Display useful offline/error states.

Do not pretend data was saved if the API failed.

---

# 156. FORM AUTOSAVE

For long notes/forms where appropriate:

Display:

Saving...

Saved

Do not autosave destructive operations.

---

# 157. UNSAVED CHANGES

Warn users when leaving forms with unsaved changes.

---

# 158. PROFILE EXPERIENCE

Profile should feel like a career identity page.

Display:

Name

Target role

Skills

Preferred location

Work preference

Career goals

Application statistics

---

# 159. HELP CENTER

Create:

Getting Started

Applications

Interviews

Analytics

Documents

Settings

AI Copilot

FAQ

---

# 160. TOOLTIP SYSTEM

Use tooltips for icon-only controls.

Do not add unnecessary tooltips to obvious text buttons.

---

# 161. NOTIFICATION BADGES

Notification count must update dynamically.

When notifications are read:

Badge count must change.

---

# 162. USER MENU

Profile dropdown:

Profile

Settings

Keyboard Shortcuts

Help

Logout

---

# 163. COMMAND PALETTE DESIGN

Use:

Search input

Command categories

Keyboard hints

Icons

Active selection

Smooth open/close animation

---

# 164. APPLICATION DETAIL ACTIONS

Actions:

Edit

Change Status

Add Note

Schedule Interview

Follow Up

Archive

Delete

Favorite

---

# 165. STATUS TRANSITIONS

Support:

Wishlist → Applied

Applied → Screening

Screening → Interview

Interview → Final Interview

Final Interview → Offer

Any stage → Rejected

Any stage → Withdrawn

---

# 166. OFFER COMPARISON

Allow comparing offers using:

Salary

Bonus

Equity

Benefits

Location

Work type

Start date

---

# 167. RESUME ASSOCIATION

Allow selecting which resume was used for each application.

Display it in application details.

---

# 168. COVER LETTER ASSOCIATION

Allow selecting the cover letter associated with each application.

---

# 169. DOCUMENT VERSIONING

Support:

Resume v1

Resume v2

Resume v3

Display latest version.

---

# 170. APPLICATION SOURCE

Track:

LinkedIn

Naukri

Indeed

Referral

Website

Recruiter

Other

---

# 171. NETWORKING FOLLOW-UP

Allow:

Set follow-up date

Create reminder

Add interaction

Record outcome

---

# 172. INTERVIEW FOLLOW-UP

After interview completion:

Prompt:

"Add interview notes"

"Schedule follow-up"

"Mark next step"

---

# 173. THANK-YOU FLOW

Allow users to create a thank-you reminder after interviews.

Do not automatically send emails unless a real integration exists.

---

# 174. EMAIL SIMULATION

If email integration isn't configured:

Allow composing an email.

Clearly show:

"Demo — email not sent."

---

# 175. AI JOB SUMMARY

Career Copilot can summarize:

* Responsibilities
* Requirements
* Skills
* Experience
* Work type

---

# 176. AI INTERVIEW PREP

Generate demo questions based on:

Position

Job description

Interview type

Skills

---

# 177. AI SKILL GAP

Compare:

User skills

Job requirements

Show:

Matched skills

Potential missing skills

Clearly label as AI-generated/demo if applicable.

---

# 178. AI FOLLOW-UP ASSISTANT

Suggest a follow-up message based on application status.

Keep it as a draft.

Never send automatically.

---

# 179. AI PRIVACY

Do not send sensitive data to AI services without explicit configuration.

AI requests should be handled through FastAPI.

---

# 180. CAREER COPILOT UI

Create:

Floating assistant button

Chat panel

Suggested prompts

Conversation history

Loading state

Error state

---

# 181. DATA PRIVACY

Provide settings:

Export Data

Delete Data

Clear Local Data

Manage AI preferences

---

# 182. ACCOUNT DELETION

Create confirmation flow.

Require explicit confirmation.

---

# 183. IMPORT/EXPORT

Export:

Applications

Contacts

Jobs

Tasks

JSON

CSV

---

# 184. SEARCH FILTERS

Search should support:

Status

Company

Location

Position

Tags

Priority

Date

Source

---

# 185. ADVANCED FILTER BUILDER

Allow users to combine filters.

Example:

Status = Interview

AND

Priority = High

AND

Work Type = Remote

---

# 186. SAVED FILTERS

Allow users to save frequently used filters.

Example:

"High Priority Interviews"

"Remote Backend Jobs"

---

# 187. DASHBOARD FILTERING

Allow dashboard analytics date filtering.

Changes should update charts and metrics.

---

# 188. REAL-TIME FEEL

Even if using standard REST APIs:

Create a responsive application experience.

After mutations:

Update UI immediately.

Show toast.

Refresh affected metrics.

---

# 189. CACHING

Cache safe read-heavy data.

Invalidate cache when relevant data changes.

---

# 190. LOGGING

Backend should have structured logging.

Do not expose secrets.

---

# 191. OBSERVABILITY

Prepare for:

Sentry

Health checks

API monitoring

Database monitoring

---

# 192. HEALTH ENDPOINT

Create:

GET /health

Return API health status.

---

# 193. DATABASE HEALTH

Health check should optionally verify PostgreSQL connectivity.

---

# 194. REDIS HEALTH

Health check should optionally verify Redis connectivity.

---

# 195. FRONTEND ERROR HANDLING

Create global error handling.

Unexpected errors should display a friendly fallback.

---

# 196. 404 PAGE

Create a premium 404 page.

Message:

"Looks like this opportunity doesn't exist."

Button:

Back to Dashboard

---

# 197. AUTHENTICATION ERROR

If session expires:

Show:

"Your session has expired."

Then redirect to login.

---

# 198. LOADING EXPERIENCE

Use skeleton loaders instead of generic spinners whenever possible.

For actions:

Use compact button spinners.

---

# 199. PREMIUM DETAILS

Add subtle premium details:

* Animated number counters
* Hover elevation
* Smooth chart transitions
* Status transitions
* Interactive timeline
* Keyboard shortcuts
* Contextual actions
* Smart empty states
* Responsive modals
* Smart tooltips

Keep everything restrained.

---

# 200. NO OVERDESIGN

Do not sacrifice usability for visual effects.

The application must prioritize:

Clarity

Speed

Accessibility

Consistency

Functionality

---

# 201. REALISTIC DATA

Use realistic demo data.

Include:

Applications at different stages.

Jobs with different salaries.

Companies.

Recruiters.

Interviews.

Tasks.

Offers.

Follow-ups.

Notes.

Do not hardcode dashboard metrics independently of the data.

---

# 202. DATA RELATIONSHIPS

Ensure relationships work.

Example:

Application

→ Job

→ Company

→ Recruiter

→ Resume

→ Cover Letter

→ Interview

→ Tasks

→ Notes

→ Timeline

---

# 203. DASHBOARD DATA

Dashboard must calculate:

Total applications

Active applications

Interviews

Offers

Response rate

Interview rate

Weekly applications

Follow-ups

---

# 204. ANALYTICS DATA

Analytics must derive from PostgreSQL/API data.

Do not create separate fake analytics data.

---

# 205. UI STATE

Every major page should support:

Loading

Loaded

Empty

Error

Success

---

# 206. COMPONENT STATE

Interactive components must support:

Default

Hover

Focus

Active

Disabled

Loading

Error

Success

---

# 207. MOBILE TOUCH TARGETS

Ensure interactive controls are comfortable for touch.

Avoid tiny buttons.

---

# 208. ACCESSIBLE FOCUS

Every keyboard-accessible control must have visible focus.

---

# 209. MODAL ACCESSIBILITY

Dialogs must:

* Trap focus
* Close appropriately
* Support Escape
* Have accessible labels

---

# 210. FINAL PRODUCT QUALITY

The final JobFlow application should look like a real premium SaaS product.

It must not look like:

* A college CRUD project
* A simple admin template
* A static prototype
* A collection of unrelated pages
* A basic Bootstrap dashboard

It should look like:

A polished professional job-search management platform.

---

# 211. DEVELOPMENT PROCESS

Do not generate everything blindly in one step.

Follow this process:

STEP 1

Analyze requirements.

STEP 2

Create architecture.

STEP 3

Create database schema.

STEP 4

Create FastAPI project.

STEP 5

Create Angular project structure.

STEP 6

Create design system.

STEP 7

Create application shell.

STEP 8

Create authentication.

STEP 9

Create dashboard.

STEP 10

Create application management.

STEP 11

Create Kanban.

STEP 12

Create jobs.

STEP 13

Create companies.

STEP 14

Create contacts.

STEP 15

Create interviews.

STEP 16

Create calendar.

STEP 17

Create tasks.

STEP 18

Create documents.

STEP 19

Create offers.

STEP 20

Create analytics.

STEP 21

Create goals.

STEP 22

Create notifications.

STEP 23

Create AI Career Copilot.

STEP 24

Create settings.

STEP 25

Connect all state.

STEP 26

Implement responsive behavior.

STEP 27

Implement dark mode.

STEP 28

Implement testing.

STEP 29

Run QA.

STEP 30

Fix all issues.

STEP 31

Perform visual polish.

STEP 32

Perform final end-to-end testing.

---

# 212. BUILD RULE

Do not stop after creating the UI.

Actually implement the interactions.

If an element appears clickable, it must work.

If a metric is displayed, it must be calculated from data.

If a filter exists, it must filter.

If sorting exists, it must sort.

If a card can be dragged, it must update the application's state.

---

# 213. TESTING CHECKLIST

Test:

Login

Register

Logout

Onboarding

Dashboard

Application creation

Application editing

Application deletion

Application status change

Kanban drag/drop

Search

Filtering

Sorting

Bulk actions

Job creation

Company management

Contact management

Interview creation

Calendar

Task management

Reminders

Documents

Resume management

Cover letters

Offers

Analytics

Goals

Notifications

Settings

Dark mode

AI Copilot

Export

Import

---

# 214. RESPONSIVE TESTING

Test every major page at:

320px

375px

414px

768px

1024px

1280px

1440px

1536px+

Fix:

Overflow

Broken grids

Tiny controls

Unreadable tables

Incorrect spacing

Horizontal overflow

---

# 215. FINAL CODE QUALITY

Before finishing:

Remove unused imports.

Remove dead code.

Remove duplicate components.

Remove placeholder text.

Remove broken links.

Remove console errors.

Fix TypeScript errors.

Fix API errors.

Fix responsive issues.

Fix accessibility issues.

---

# 216. README

Create a professional README containing:

Project overview

Features

Architecture

Technology stack

Installation

Environment variables

Database setup

Migration commands

Seed commands

Frontend commands

Backend commands

Docker commands

Testing

Deployment

AI configuration

---

# 217. ENVIRONMENT FILE

Create:

.env.example

Include placeholders for:

DATABASE_URL

JWT_SECRET

REDIS_URL

S3 credentials

AI API key

SENTRY_DSN

Never include real secrets.

---

# 218. DOCKER COMPOSE

Create a development environment containing:

Frontend

Backend

PostgreSQL

Redis

Ensure services communicate correctly.

---

# 219. CI/CD

Create GitHub Actions workflow.

Pipeline:

Install

Lint

Type check

Backend tests

Frontend tests

Build

E2E tests where practical

---

# 220. PRODUCTION READINESS

Prepare architecture for:

* Real authentication
* Real email
* Real job APIs
* Real AI APIs
* Cloud storage
* PostgreSQL production deployment
* Redis
* Monitoring
* Scaling

---

# 221. FUTURE JOB API INTEGRATION

Keep job discovery architecture extensible.

Possible future integrations:

LinkedIn where officially permitted

Indeed APIs where officially permitted

Adzuna

The Muse

Other authorized job APIs

Do not scrape websites in violation of their terms.

---

# 222. API ABSTRACTION

Create:

JobProviderService

so different job APIs can later be integrated without changing the UI.

---

# 223. AI ABSTRACTION

Create:

AIService

with provider abstraction.

Possible providers:

Gemini

OpenAI

Local model

The frontend must never directly contain provider secrets.

---

# 224. FILE STORAGE ABSTRACTION

Create:

StorageService

Allow:

Local storage

S3

Cloudinary

without changing UI components.

---

# 225. FINAL UX JOURNEY

The complete experience should be:

Landing Page

↓

Register

↓

Onboarding

↓

Dashboard

↓

Discover Job

↓

Save Job

↓

Create Application

↓

Choose Resume

↓

Set Follow-up

↓

Track Application

↓

Interview

↓

Prepare

↓

Complete Interview

↓

Follow Up

↓

Offer

↓

Compare Offer

↓

Career Analytics

---

# 226. FINAL ACCEPTANCE CRITERIA

Consider the project complete only when:

✓ Angular frontend works

✓ TypeScript has no avoidable errors

✓ FastAPI backend works

✓ PostgreSQL works

✓ SQLAlchemy works

✓ Alembic migrations work

✓ Authentication works

✓ Authorization works

✓ Dashboard works

✓ Applications work

✓ Kanban works

✓ Jobs work

✓ Companies work

✓ Contacts work

✓ Interviews work

✓ Calendar works

✓ Tasks work

✓ Documents work

✓ Resumes work

✓ Cover letters work

✓ Offers work

✓ Analytics work

✓ Goals work

✓ Notifications work

✓ AI interface works in demo mode

✓ Search works

✓ Filtering works

✓ Sorting works

✓ CRUD works

✓ Export works

✓ Import works

✓ Dark mode works

✓ Responsive design works

✓ Mobile navigation works

✓ Accessibility is addressed

✓ Loading states exist

✓ Empty states exist

✓ Error states exist

✓ No major dead buttons exist

✓ No major broken routes exist

✓ No major console errors remain

---

# 227. FINAL INSTRUCTION

Do not treat this project as a simple coding exercise.

Treat it as a commercial SaaS product.

Think about:

Product

UX

Architecture

Performance

Accessibility

Security

Scalability

Responsive design

Visual consistency

Data integrity

Testing

Deployment

The final result must be a **rich, modern, responsive, premium Job Tracker platform** built using:

**Angular + TypeScript + Tailwind CSS + Angular Material/CDK + Lucide + ECharts + Signals/RxJS + Python + FastAPI + Pydantic + SQLAlchemy + PostgreSQL + Alembic + Redis + Docker + Playwright + Pytest + GitHub Actions**

Build the application completely.

Do not stop at mockups.

Do not leave major features as static placeholders.

Implement the complete experience, test it, fix it, and polish it until it feels production-quality.
