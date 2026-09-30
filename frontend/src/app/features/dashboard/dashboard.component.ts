import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule, Briefcase, UserCheck, Award, TrendingUp, Calendar,
  ArrowUpRight, Clock, Plus, Target, CheckCircle2, ChevronRight, Zap,
  Building2, MapPin, Star, Bell, BarChart3
} from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Good morning, {{ firstName }} 👋
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Here's your job-search metrics overview.</p>
        </div>
        <div class="flex items-center gap-3">
          <a routerLink="/kanban"
            class="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2 shadow-sm">
            Open Kanban
            <lucide-icon name="arrow-up-right" [size]="15"></lucide-icon>
          </a>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Applied</span>
            <div class="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
              <lucide-icon name="briefcase" [size]="18" class="text-violet-600 dark:text-violet-400"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-gray-900 dark:text-white">{{ metrics.total_applications }}</div>
          <div class="flex items-center gap-1 mt-1">
            <lucide-icon name="trending-up" [size]="12" class="text-emerald-500"></lucide-icon>
            <span class="text-xs text-emerald-600 font-semibold">+12% this week</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Roles</span>
            <div class="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <lucide-icon name="zap" [size]="18" class="text-amber-600 dark:text-amber-400"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-gray-900 dark:text-white">{{ metrics.active_applications }}</div>
          <span class="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full font-medium">In progress</span>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Interviews</span>
            <div class="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <lucide-icon name="user-check" [size]="18" class="text-blue-600 dark:text-blue-400"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-gray-900 dark:text-white">{{ metrics.interviews_count }}</div>
          <span class="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full font-medium">Upcoming</span>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Offers</span>
            <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <lucide-icon name="award" [size]="18" class="text-emerald-600 dark:text-emerald-400"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-emerald-600 dark:text-emerald-400">{{ metrics.offers_count }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ metrics.response_rate }}% response rate</div>
        </div>
      </div>

      <!-- Pipeline Funnel -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white">Application Pipeline</h3>
            <p class="text-xs text-gray-500 mt-0.5">Distribution across recruitment stages</p>
          </div>
          <a routerLink="/kanban" class="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1">
            View Board <lucide-icon name="chevron-right" [size]="14"></lucide-icon>
          </a>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div *ngFor="let stage of pipelineStages"
            class="p-3 rounded-xl border text-center transition-all hover:shadow-sm cursor-pointer"
            [style.borderColor]="stage.color + '40'"
            [style.backgroundColor]="stage.color + '10'">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1.5 truncate" [style.color]="stage.color">{{ stage.name }}</div>
            <div class="text-2xl font-black text-gray-900 dark:text-white">{{ stage.count }}</div>
            <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" [style.width]="stage.pct + '%'" [style.background]="stage.color"></div>
            </div>
            <div class="text-[10px] text-gray-400 mt-1">{{ stage.pct }}%</div>
          </div>
        </div>
      </div>

      <!-- Bottom Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <!-- Recent Applications -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-bold text-gray-900 dark:text-white">Recent Applications</h3>
            <a routerLink="/applications" class="text-xs font-semibold text-violet-600 hover:text-violet-700">View All →</a>
          </div>
          <div class="space-y-1">
            <div *ngFor="let app of recentApps"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group">
              <!-- Company Logo/Initial -->
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 text-white"
                [style.background]="getCompanyColor(app.company_name)">
                {{ app.company_name[0] }}
              </div>
              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                  {{ app.position }}
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <lucide-icon name="building-2" [size]="11"></lucide-icon>
                  <span>{{ app.company_name }}</span>
                  <span>•</span>
                  <lucide-icon name="map-pin" [size]="11"></lucide-icon>
                  <span class="truncate">{{ app.work_type }}</span>
                </div>
              </div>
              <!-- Status badge -->
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                [ngClass]="{
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400': app.status === 'Offer',
                  'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400': app.status === 'Final Interview',
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400': app.status === 'Technical Interview',
                  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400': app.status === 'Screening',
                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300': app.status === 'Applied' || app.status === 'Wishlist',
                  'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400': app.status === 'Rejected'
                }">
                {{ app.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-5">
          <!-- Upcoming Interview Highlight -->
          <div class="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold uppercase tracking-wider text-violet-200">Upcoming Interview</span>
              <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-xs font-semibold">Tomorrow 2 PM</span>
            </div>
            <h4 class="text-lg font-bold">Vercel — Lead Frontend</h4>
            <p class="text-xs text-violet-200 mt-1">Final Interview with VP Engineering</p>
            <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5">
                <lucide-icon name="check-circle-2" [size]="14" class="text-emerald-300"></lucide-icon>
                <span class="text-violet-100">STAR Stories Prepared</span>
              </div>
              <a routerLink="/interviews" class="font-semibold underline underline-offset-2">Review →</a>
            </div>
          </div>

          <!-- Weekly Goal -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <lucide-icon name="target" [size]="16" class="text-violet-600"></lucide-icon>
                <h4 class="font-bold text-sm text-gray-900 dark:text-white">Weekly Target</h4>
              </div>
              <span class="text-sm font-black text-violet-600">70%</span>
            </div>
            <div class="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mb-2">
              <div class="bg-violet-600 h-full rounded-full w-[70%] transition-all duration-700"></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">7 of 10 target applications this week</p>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <h4 class="font-bold text-sm text-gray-900 dark:text-white mb-3">Quick Stats</h4>
            <div class="space-y-2.5">
              <div *ngFor="let stat of quickStats" class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div class="w-2 h-2 rounded-full" [style.background]="stat.color"></div>
                  {{ stat.label }}
                </div>
                <span class="text-xs font-bold text-gray-900 dark:text-white">{{ stat.value }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class DashboardComponent {
  authService = inject(AuthService);
  appService = inject(ApplicationService);

  get firstName() {
    return this.authService.currentUser()?.full_name?.split(' ')[0] || 'there';
  }

  get metrics() {
    return this.appService.metrics();
  }

  get recentApps() {
    return this.appService.applications().slice(0, 6);
  }

  get pipelineStages() {
    const apps = this.appService.applications();
    const total = apps.length || 1;
    const stageConfig = [
      { name: 'Wishlist',    color: '#94a3b8' },
      { name: 'Applied',     color: '#3b82f6' },
      { name: 'Screening',   color: '#f59e0b' },
      { name: 'Technical',   color: '#8b5cf6' },
      { name: 'Final',       color: '#ec4899' },
      { name: 'Offer',       color: '#10b981' },
      { name: 'Rejected',    color: '#ef4444' },
    ];
    const statusMap: Record<string, string> = {
      'Wishlist': 'Wishlist', 'Applied': 'Applied', 'Screening': 'Screening',
      'Technical': 'Technical Interview', 'Final': 'Final Interview',
      'Offer': 'Offer', 'Rejected': 'Rejected'
    };
    return stageConfig.map(s => {
      const count = apps.filter(a => a.status === (statusMap[s.name] || s.name)).length;
      return { ...s, count, pct: Math.round((count / total) * 100) };
    });
  }

  quickStats = [
    { label: 'Avg Response Time', value: '3.2 days', color: '#8b5cf6' },
    { label: 'Ghosted',           value: '2 apps',   color: '#ef4444' },
    { label: 'This Month',        value: '14 apps',  color: '#3b82f6' },
    { label: 'Success Rate',      value: '38%',      color: '#10b981' },
  ];

  getCompanyColor(name: string): string {
    const colors = ['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#ec4899','#06b6d4','#f97316'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }
}
