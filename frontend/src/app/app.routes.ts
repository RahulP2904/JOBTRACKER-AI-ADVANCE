import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes (redirect to dashboard if already logged in)
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then(m => m.OnboardingComponent),
  },

  // Protected app shell (requires authentication)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/app-shell/app-shell.component').then(m => m.AppShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'applications',
        loadComponent: () =>
          import('./features/applications/applications.component').then(m => m.ApplicationsComponent),
      },
      {
        path: 'kanban',
        loadComponent: () =>
          import('./features/kanban/kanban.component').then(m => m.KanbanComponent),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/jobs/jobs.component').then(m => m.JobsComponent),
      },
      {
        path: 'interviews',
        loadComponent: () =>
          import('./features/interviews/interviews.component').then(m => m.InterviewsComponent),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/calendar/calendar.component').then(m => m.CalendarComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent),
      },
      {
        path: 'companies',
        loadComponent: () =>
          import('./features/companies/companies.component').then(m => m.CompaniesComponent),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./features/contacts/contacts.component').then(m => m.ContactsComponent),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./features/documents/documents.component').then(m => m.DocumentsComponent),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./features/offers/offers.component').then(m => m.OffersComponent),
      },
      {
        path: 'goals',
        loadComponent: () =>
          import('./features/goals/goals.component').then(m => m.GoalsComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then(m => m.SettingsComponent),
      },
    ],
  },

  // 404 Catch-all
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
