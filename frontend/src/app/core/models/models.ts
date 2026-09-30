export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  target_role?: string;
  location?: string;
  experience_level?: string;
  work_preference?: string;
  weekly_target: number;
  created_at?: string;
}

export type ApplicationStatus = 
  | 'Wishlist' 
  | 'Applied' 
  | 'Screening' 
  | 'Technical Interview' 
  | 'Final Interview' 
  | 'Offer' 
  | 'Rejected' 
  | 'Withdrawn';

export type ApplicationPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Application {
  id: string;
  user_id?: string;
  position: string;
  company_name: string;
  company_logo?: string;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  location?: string;
  work_type: 'Remote' | 'Hybrid' | 'Onsite';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  source: string;
  date_applied: string;
  next_action?: string;
  next_action_date?: string;
  notes?: string;
  favorite: boolean;
  archived?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
  location?: string;
  work_type: 'Remote' | 'Hybrid' | 'Onsite';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  experience_level?: string;
  job_url?: string;
  description?: string;
  requirements?: string;
  skills?: string;
  is_saved: boolean;
  match_score: number;
  posted_date?: string;
}

export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  created_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  position?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  relationship_type: string;
  notes?: string;
  last_contacted?: string;
  next_followup?: string;
}

export interface Interview {
  id: string;
  application_id: string;
  title: string;
  interview_type: string;
  interviewer_name?: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_url?: string;
  location?: string;
  prep_checklist?: string;
  questions?: string;
  notes?: string;
  is_completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'To Do' | 'In Progress' | 'Completed';
  application_id?: string;
}

export interface Offer {
  id: string;
  application_id: string;
  company_name: string;
  position: string;
  base_salary: number;
  bonus?: number;
  equity?: string;
  currency: string;
  benefits_summary?: string;
  start_date?: string;
  deadline?: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Expired';
}

export interface DashboardMetrics {
  total_applications: number;
  active_applications: number;
  interviews_count: number;
  offers_count: number;
  response_rate: number;
  weekly_applications: number;
  weekly_target: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'interview' | 'task' | 'followup' | 'goal' | 'offer';
  is_read: boolean;
  created_at: string;
}

export interface GoalItem {
  id: string;
  title: string;
  target_type: string;
  target_value: number;
  current_value: number;
  period: string;
}
