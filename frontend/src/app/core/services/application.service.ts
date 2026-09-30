import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application, ApplicationStatus, DashboardMetrics, Job, Contact, Interview, TaskItem, Offer, NotificationItem, GoalItem } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API = 'http://localhost:8000/api/v1';

  // Signals default to clean, empty arrays for fresh user accounts
  applications = signal<Application[]>([]);
  jobs = signal<Job[]>([]);
  tasks = signal<TaskItem[]>([]);
  notifications = signal<NotificationItem[]>([]);
  goals = signal<GoalItem[]>([]);

  constructor() {
    // Automatically load backend data when user signs in, or clear when signing out
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.loadUserBackendData();
      } else {
        this.clearState();
      }
    });
  }

  loadUserBackendData() {
    const headers = this.authService.getAuthHeaders();

    this.http.get<Application[]>(`${this.API}/applications`, { headers }).subscribe({
      next: (data) => this.applications.set(data || []),
      error: () => this.applications.set([])
    });

    this.http.get<Job[]>(`${this.API}/jobs`, { headers }).subscribe({
      next: (data) => this.jobs.set(data || []),
      error: () => this.jobs.set([])
    });

    this.http.get<GoalItem[]>(`${this.API}/goals`, { headers }).subscribe({
      next: (data) => this.goals.set(data || []),
      error: () => this.goals.set([])
    });
  }

  // Clear state when user logs out
  clearState() {
    this.applications.set([]);
    this.jobs.set([]);
    this.tasks.set([]);
    this.notifications.set([]);
    this.goals.set([]);
  }

  // Computed Metrics (reactive from user's actual applications)
  metrics = computed<DashboardMetrics>(() => {
    const list = this.applications().filter(a => !a.archived);
    const total = list.length;
    const active = list.filter(a => !['Rejected', 'Withdrawn', 'Offer'].includes(a.status)).length;
    const interviews = list.filter(a => ['Screening', 'Technical Interview', 'Final Interview'].includes(a.status)).length;
    const offers = list.filter(a => a.status === 'Offer').length;
    const responded = list.filter(a => !['Wishlist', 'Applied'].includes(a.status)).length;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

    return {
      total_applications: total,
      active_applications: active,
      interviews_count: interviews,
      offers_count: offers,
      response_rate: responseRate,
      weekly_applications: total,
      weekly_target: this.authService.currentUser()?.weekly_target || 10
    };
  });

  // Actions
  addApplication(app: Partial<Application>) {
    const headers = this.authService.getAuthHeaders();
    const payload = {
      position: app.position || 'Software Engineer',
      company_name: app.company_name || 'Tech Company',
      company_logo: app.company_logo || '',
      status: app.status || 'Applied',
      priority: app.priority || 'Medium',
      location: app.location || 'Remote',
      work_type: app.work_type || 'Remote',
      salary_min: app.salary_min || 0,
      salary_max: app.salary_max || 0,
      currency: app.currency || 'USD',
      source: app.source || 'LinkedIn',
      date_applied: app.date_applied || new Date().toISOString(),
      next_action: app.next_action || '',
      notes: app.notes || '',
      favorite: false
    };

    // Optimistic local update for instantaneous UI feedback
    const localApp: Application = {
      id: 'app-' + Date.now(),
      ...payload,
      archived: false
    };
    this.applications.update(current => [localApp, ...current]);

    // Send HTTP POST to backend to persist application
    this.http.post<Application>(`${this.API}/applications`, payload, { headers }).subscribe({
      next: (created) => {
        // Replace temp local app with backend model
        this.applications.update(current => 
          current.map(a => a.id === localApp.id ? created : a)
        );
      },
      error: (err) => console.warn('Backend sync note:', err)
    });
  }

  updateApplicationStatus(id: string, newStatus: ApplicationStatus) {
    this.applications.update(current => 
      current.map(app => app.id === id ? { ...app, status: newStatus, updated_at: new Date().toISOString() } : app)
    );
    const headers = this.authService.getAuthHeaders();
    this.http.patch(`${this.API}/applications/${id}`, { status: newStatus }, { headers }).subscribe({
      error: (err) => console.warn('Backend status update note:', err)
    });
  }

  deleteApplication(id: string) {
    this.applications.update(current => current.filter(app => app.id !== id));
    const headers = this.authService.getAuthHeaders();
    this.http.delete(`${this.API}/applications/${id}`, { headers }).subscribe({
      error: (err) => console.warn('Backend delete note:', err)
    });
  }

  toggleFavorite(id: string) {
    this.applications.update(current => 
      current.map(app => app.id === id ? { ...app, favorite: !app.favorite } : app)
    );
  }

  toggleTask(id: string) {
    this.tasks.update(current => 
      current.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'To Do' : 'Completed' } : t)
    );
  }

  markNotificationRead(id: string) {
    this.notifications.update(current => 
      current.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  }
}
