import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  LucideAngularModule, Search, Filter, Plus, Table, Trello, List, SlidersHorizontal,
  Star, MoreVertical, ExternalLink, Trash2, CheckCircle2, ChevronRight, X
} from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';
import { Application, ApplicationStatus } from '../../core/models/models';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Applications Workspace</h1>
          <p class="text-sm text-gray-500 mt-0.5">Manage, track, and filter your job application pipeline.</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- View Selector Tabs -->
          <div class="flex items-center bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <button 
              (click)="activeView = 'table'"
              [ngClass]="activeView === 'table' ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
              class="p-2 rounded-lg text-xs flex items-center gap-1.5 transition"
              title="Table View"
            >
              <lucide-icon name="table" [size]="16"></lucide-icon>
              <span class="hidden md:inline">Table</span>
            </button>
            <button 
              (click)="activeView = 'list'"
              [ngClass]="activeView === 'list' ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
              class="p-2 rounded-lg text-xs flex items-center gap-1.5 transition"
              title="List View"
            >
              <lucide-icon name="list" [size]="16"></lucide-icon>
              <span class="hidden md:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search Input -->
        <div class="relative w-full md:w-80 flex items-center">
          <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center z-10">
            <lucide-icon name="search" [size]="18"></lucide-icon>
          </div>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search by position or company..." 
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <!-- Filter Selectors -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select 
            [(ngModel)]="selectedStatus" 
            class="px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">All Statuses</option>
            <option value="Wishlist">Wishlist</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="Final Interview">Final Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select 
            [(ngModel)]="selectedPriority" 
            class="px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <!-- Data Table View -->
      <div *ngIf="activeView === 'table'" class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th class="py-3.5 px-4">Company & Position</th>
                <th class="py-3.5 px-4">Status</th>
                <th class="py-3.5 px-4">Priority</th>
                <th class="py-3.5 px-4">Salary Range</th>
                <th class="py-3.5 px-4">Source</th>
                <th class="py-3.5 px-4">Applied Date</th>
                <th class="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              <tr 
                *ngFor="let app of filteredApps" 
                (click)="selectedApp = app"
                class="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 cursor-pointer transition"
              >
                <td class="py-3.5 px-4">
                  <div class="flex items-center gap-3">
                    <button 
                      (click)="$event.stopPropagation(); appService.toggleFavorite(app.id)"
                      class="text-gray-300 hover:text-amber-400 transition"
                      [class.text-amber-400]="app.favorite"
                    >
                      <lucide-icon name="star" [size]="16"></lucide-icon>
                    </button>
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white">{{ app.position }}</div>
                      <div class="text-xs text-gray-400">{{ app.company_name }} • {{ app.work_type }}</div>
                    </div>
                  </div>
                </td>

                <td class="py-3.5 px-4">
                  <span 
                    class="px-2.5 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300': app.status === 'Offer',
                      'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300': app.status.includes('Interview'),
                      'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300': app.status === 'Screening',
                      'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300': app.status === 'Applied',
                      'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300': app.status === 'Rejected'
                    }"
                  >
                    {{ app.status }}
                  </span>
                </td>

                <td class="py-3.5 px-4">
                  <span 
                    class="px-2 py-0.5 rounded text-xs font-semibold"
                    [ngClass]="{
                      'text-red-600 bg-red-50 dark:bg-red-950/40': app.priority === 'Urgent',
                      'text-orange-600 bg-orange-50 dark:bg-orange-950/40': app.priority === 'High',
                      'text-blue-600 bg-blue-50 dark:bg-blue-950/40': app.priority === 'Medium',
                      'text-slate-600 bg-slate-100 dark:bg-slate-800': app.priority === 'Low'
                    }"
                  >
                    {{ app.priority }}
                  </span>
                </td>

                <td class="py-3.5 px-4 text-xs font-mono text-gray-600 dark:text-gray-300">
                  {{ formatSalary(app.salary_min, app.salary_max) }}
                </td>

                <td class="py-3.5 px-4 text-xs text-gray-500">
                  {{ app.source }}
                </td>

                <td class="py-3.5 px-4 text-xs text-gray-400">
                  {{ app.date_applied | date:'mediumDate' }}
                </td>

                <td class="py-3.5 px-4 text-right">
                  <button 
                    (click)="$event.stopPropagation(); appService.deleteApplication(app.id)" 
                    class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
                  >
                    <lucide-icon name="trash-2" [size]="16"></lucide-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detail Drawer Modal -->
      <div *ngIf="selectedApp" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end" (click)="selectedApp = null">
        <div (click)="$event.stopPropagation()" class="w-full max-w-lg bg-white dark:bg-gray-900 h-full p-6 overflow-y-auto shadow-2xl border-l border-gray-200 dark:border-gray-800 space-y-6">
          <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedApp.position }}</h3>
              <p class="text-sm text-gray-500">{{ selectedApp.company_name }} • {{ selectedApp.location }}</p>
            </div>
            <button (click)="selectedApp = null" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <lucide-icon name="x" [size]="20"></lucide-icon>
            </button>
          </div>

          <!-- Status Selector -->
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stage Transition</label>
            <select 
              [ngModel]="selectedApp.status" 
              (ngModelChange)="appService.updateApplicationStatus(selectedApp.id, $event)"
              class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="Final Interview">Final Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <!-- Notes section -->
          <div>
            <h4 class="text-sm font-bold mb-2">Application Notes</h4>
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
              {{ selectedApp.notes || 'No detailed notes provided.' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ApplicationsComponent {
  appService = inject(ApplicationService);

  activeView: 'table' | 'list' = 'table';
  searchQuery = '';
  selectedStatus = 'All';
  selectedPriority = 'All';
  selectedApp: Application | null = null;

  get filteredApps() {
    return this.appService.applications().filter(a => {
      const matchSearch = !this.searchQuery || 
        a.position.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        a.company_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchStatus = this.selectedStatus === 'All' || a.status === this.selectedStatus;
      const matchPriority = this.selectedPriority === 'All' || a.priority === this.selectedPriority;
      return matchSearch && matchStatus && matchPriority;
    });
  }

  formatSalary(min?: number, max?: number): string {
    if (!min && !max) return 'N/A';
    const fmt = (n: number) => '$' + n.toLocaleString();
    if (min && max) return `${fmt(min)} - ${fmt(max)}`;
    if (min) return `${fmt(min)}+`;
    return `Up to ${fmt(max!)}`;
  }
}
