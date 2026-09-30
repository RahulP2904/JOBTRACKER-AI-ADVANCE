import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  LucideAngularModule, LayoutDashboard, Briefcase, Trello, Search, Calendar,
  Users, Building2, UserCheck, Network, FileText, BarChart3, Target,
  Bell, Settings, HelpCircle, User, Moon, Sun, ChevronLeft, ChevronRight
} from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <aside 
      class="h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 z-30 sticky top-0"
      [ngClass]="isCollapsed ? 'w-20' : 'w-64'"
    >
      <!-- Logo Header -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-violet-500/20 shrink-0">
            J
          </div>
          <span *ngIf="!isCollapsed" class="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            Job<span class="text-violet-600">Flow</span>
          </span>
        </div>

        <button 
          (click)="toggleCollapse()"
          class="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          [title]="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <lucide-icon [name]="isCollapsed ? 'chevron-right' : 'chevron-left'" [size]="18"></lucide-icon>
        </button>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <!-- WORKSPACE -->
        <div>
          <div *ngIf="!isCollapsed" class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </div>
          <nav class="space-y-1">
            <a 
              routerLink="/dashboard" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition group"
            >
              <lucide-icon name="layout-dashboard" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Dashboard</span>
            </a>

            <a 
              routerLink="/applications" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <div class="flex items-center gap-3">
                <lucide-icon name="briefcase" [size]="20" class="shrink-0"></lucide-icon>
                <span *ngIf="!isCollapsed">Applications</span>
              </div>
              <span *ngIf="!isCollapsed" class="px-2 py-0.5 text-xs rounded-full bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 font-medium">
                {{ appService.metrics().active_applications }}
              </span>
            </a>

            <a 
              routerLink="/kanban" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="trello" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Kanban</span>
            </a>

            <a 
              routerLink="/jobs" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="search" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Jobs</span>
            </a>

            <a 
              routerLink="/calendar" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="calendar" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Calendar</span>
            </a>
          </nav>
        </div>

        <!-- CAREER -->
        <div>
          <div *ngIf="!isCollapsed" class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Career
          </div>
          <nav class="space-y-1">
            <a 
              routerLink="/interviews" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <div class="flex items-center gap-3">
                <lucide-icon name="user-check" [size]="20" class="shrink-0"></lucide-icon>
                <span *ngIf="!isCollapsed">Interviews</span>
              </div>
              <span *ngIf="!isCollapsed" class="w-2 h-2 rounded-full bg-emerald-500"></span>
            </a>

            <a 
              routerLink="/companies" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="building-2" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Companies</span>
            </a>

            <a 
              routerLink="/contacts" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="users" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Contacts</span>
            </a>

            <a 
              routerLink="/documents" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="file-text" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Documents</span>
            </a>
          </nav>
        </div>

        <!-- INSIGHTS -->
        <div>
          <div *ngIf="!isCollapsed" class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Insights
          </div>
          <nav class="space-y-1">
            <a 
              routerLink="/analytics" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="bar-chart-3" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Analytics</span>
            </a>

            <a 
              routerLink="/goals" 
              routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
            >
              <lucide-icon name="target" [size]="20" class="shrink-0"></lucide-icon>
              <span *ngIf="!isCollapsed">Goals</span>
            </a>
          </nav>
        </div>
      </div>

      <!-- Bottom System Links -->
      <div class="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
        <button 
          (click)="themeService.setTheme(themeService.isDark() ? 'light' : 'dark')"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <lucide-icon [name]="themeService.isDark() ? 'sun' : 'moon'" [size]="20" class="shrink-0"></lucide-icon>
          <span *ngIf="!isCollapsed">{{ themeService.isDark() ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>

        <a 
          routerLink="/settings" 
          routerLinkActive="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 font-semibold"
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <lucide-icon name="settings" [size]="20" class="shrink-0"></lucide-icon>
          <span *ngIf="!isCollapsed">Settings</span>
        </a>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  themeService = inject(ThemeService);
  appService = inject(ApplicationService);

  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
