import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        <button *ngFor="let tab of tabs" (click)="activeTab.set(tab.id)"
          class="flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all"
          [class]="activeTab() === tab.id ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Profile Tab -->
      <div *ngIf="activeTab() === 'profile'" class="space-y-5">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-5">Profile Information</h2>

          <!-- Avatar -->
          <div class="flex items-center gap-5 mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
              {{ authService.user()?.full_name?.charAt(0) || 'U' }}
            </div>
            <div>
              <button class="px-4 py-2 text-sm font-medium text-violet-600 bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-xl transition-colors">
                Change Photo
              </button>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input [(ngModel)]="profile.name" type="text"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input [(ngModel)]="profile.email" type="email"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
              <input [(ngModel)]="profile.title" type="text" placeholder="e.g. Senior Software Engineer"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input [(ngModel)]="profile.location" type="text" placeholder="e.g. San Francisco, CA"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
              <input [(ngModel)]="profile.linkedin" type="url" placeholder="https://linkedin.com/in/..."
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
          </div>

          <div class="flex justify-end mt-5">
            <button (click)="saveProfile()"
              class="px-6 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Appearance Tab -->
      <div *ngIf="activeTab() === 'appearance'" class="space-y-5">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-5">Appearance</h2>

          <!-- Theme -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
            <div class="grid grid-cols-3 gap-3">
              <button (click)="themeService.setTheme('light')"
                class="p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all"
                [class]="themeService.theme() === 'light' ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'">
                <div class="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xl">☀️</div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
              </button>
              <button (click)="themeService.setTheme('dark')"
                class="p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all"
                [class]="themeService.theme() === 'dark' ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'">
                <div class="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-xl">🌙</div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
              </button>
              <button (click)="themeService.setTheme('system')"
                class="p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all"
                [class]="themeService.theme() === 'system' ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-white to-gray-900 flex items-center justify-center text-xl">💻</div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">System</span>
              </button>
            </div>
          </div>

          <!-- Accent Color -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</label>
            <div class="flex gap-3">
              <button *ngFor="let color of accentColors"
                (click)="selectedAccent.set(color.id)"
                class="w-10 h-10 rounded-xl transition-all hover:scale-110"
                [style.background]="color.value"
                [class]="selectedAccent() === color.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''">
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar Layout -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layout</h2>
          <div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <div>
              <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Compact Sidebar</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Use icon-only sidebar by default</div>
            </div>
            <button (click)="toggles.compactSidebar = !toggles.compactSidebar"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              [class]="toggles.compactSidebar ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                [class]="toggles.compactSidebar ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Show Animations</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Enable UI transitions and animations</div>
            </div>
            <button (click)="toggles.animations = !toggles.animations"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              [class]="toggles.animations ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                [class]="toggles.animations ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications Tab -->
      <div *ngIf="activeTab() === 'notifications'" class="space-y-5">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-5">Notification Preferences</h2>
          <div class="space-y-4">
            <div *ngFor="let notif of notificationSettings" class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ notif.label }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ notif.description }}</div>
              </div>
              <button (click)="notif.enabled = !notif.enabled"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                [class]="notif.enabled ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-600'">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  [class]="notif.enabled ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Tab -->
      <div *ngIf="activeTab() === 'account'" class="space-y-5">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-5">Change Password</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
              <input type="password" placeholder="••••••••"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <input type="password" placeholder="••••••••"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
              <input type="password" placeholder="••••••••"
                class="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </div>
            <button class="px-6 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors">
              Update Password
            </button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-red-200 dark:border-red-900/50">
          <h2 class="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button class="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      <!-- Success Toast -->
      <div *ngIf="saved()"
        class="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-xl shadow-lg text-sm font-medium z-50 animate-slide-in">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Settings saved!
      </div>
    </div>
  `
})
export class SettingsComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  activeTab = signal('profile');
  saved = signal(false);
  selectedAccent = signal('violet');

  tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'account', label: 'Account' },
  ];

  profile = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/alexjohnson',
  };

  accentColors = [
    { id: 'violet', value: '#8b5cf6' },
    { id: 'blue', value: '#3b82f6' },
    { id: 'green', value: '#10b981' },
    { id: 'rose', value: '#f43f5e' },
    { id: 'orange', value: '#f97316' },
    { id: 'cyan', value: '#06b6d4' },
  ];

  toggles = { compactSidebar: false, animations: true };

  notificationSettings = [
    { label: 'Interview Reminders', description: 'Get reminded 24 hours before interviews', enabled: true },
    { label: 'Application Deadlines', description: 'Alerts for upcoming application deadlines', enabled: true },
    { label: 'Follow-up Reminders', description: 'Remind to follow up after applications', enabled: false },
    { label: 'Weekly Summary', description: 'Weekly digest of your job search progress', enabled: true },
    { label: 'AI Suggestions', description: 'Personalized recommendations from AI', enabled: true },
    { label: 'Email Notifications', description: 'Receive notifications via email', enabled: false },
  ];

  saveProfile() {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2500);
  }
}
