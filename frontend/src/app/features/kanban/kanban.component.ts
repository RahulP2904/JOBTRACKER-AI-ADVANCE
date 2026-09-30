import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  LucideAngularModule, Plus, MoreHorizontal, Building2, MapPin, DollarSign,
  CheckCircle2, Sparkles, Filter, X, ArrowUpRight
} from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';
import { Application, ApplicationStatus } from '../../core/models/models';

interface KanbanColumn {
  id: ApplicationStatus;
  title: string;
  badgeColor: string;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Header Bar -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            Kanban Pipeline Board
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
              Drag & Drop Live
            </span>
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Drag application cards between recruitment stages to update their progress.</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Search Filter in Board -->
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Filter cards..."
              class="w-48 px-3.5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      <!-- Action Toast Notification -->
      <div *ngIf="toastMessage()" class="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-between animate-in fade-in">
        <div class="flex items-center gap-2">
          <lucide-icon name="check-circle-2" [size]="16" class="text-emerald-500"></lucide-icon>
          <span>{{ toastMessage() }}</span>
        </div>
        <button (click)="toastMessage.set('')" class="text-emerald-500 hover:text-emerald-700">
          <lucide-icon name="x" [size]="14"></lucide-icon>
        </button>
      </div>

      <!-- Kanban Columns Container -->
      <div class="flex gap-4 overflow-x-auto pb-6 min-h-[calc(100vh-14rem)] items-start scrollbar-thin">
        <div
          *ngFor="let col of columns"
          class="w-80 shrink-0 bg-gray-100/70 dark:bg-gray-900/60 rounded-3xl p-4 border border-gray-200/60 dark:border-gray-800/60 flex flex-col max-h-[calc(100vh-14rem)]">
          
          <!-- Column Header -->
          <div class="flex items-center justify-between pb-3 px-1 border-b border-gray-200/50 dark:border-gray-800/50 mb-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" [style.background]="col.badgeColor"></span>
              <h3 class="font-bold text-sm text-gray-900 dark:text-white truncate" [title]="col.title">{{ col.title }}</h3>
              <span class="px-2 py-0.5 text-xs rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold shadow-xs">
                {{ getFilteredAppsForColumn(col.id).length }}
              </span>
            </div>
          </div>

          <!-- Drop List Area (Angular CDK) -->
          <div
            cdkDropList
            [id]="col.id"
            [cdkDropListData]="getFilteredAppsForColumn(col.id)"
            [cdkDropListConnectedTo]="columnIds"
            (cdkDropListDropped)="onCardDropped($event, col.id)"
            class="flex-1 space-y-3 min-h-[160px] overflow-y-auto pr-1">
            
            <!-- Application Card -->
            <div
              *ngFor="let app of getFilteredAppsForColumn(col.id)"
              cdkDrag
              [cdkDragData]="app"
              class="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/70 shadow-soft hover:shadow-md transition-all cursor-grab active:cursor-grabbing space-y-3 group hover:border-violet-500/50">
              
              <!-- Card Header -->
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0 flex-1">
                  <h4 class="font-bold text-sm text-gray-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" [title]="app.position">
                    {{ app.position }}
                  </h4>
                  <div class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <lucide-icon name="building-2" [size]="12"></lucide-icon>
                    <span class="font-medium truncate">{{ app.company_name }}</span>
                  </div>
                </div>

                <!-- Priority Badge -->
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0"
                  [ngClass]="{
                    'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300': app.priority === 'Urgent',
                    'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300': app.priority === 'High',
                    'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300': app.priority === 'Medium',
                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400': app.priority === 'Low'
                  }">
                  {{ app.priority }}
                </span>
              </div>

              <!-- Location & Salary Metadata -->
              <div class="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-100 dark:border-gray-700/50">
                <span class="flex items-center gap-1">
                  <lucide-icon name="map-pin" [size]="12"></lucide-icon>
                  {{ app.work_type }}
                </span>
                <span *ngIf="app.salary_min || app.salary_max" class="font-mono text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                  {{ formatSalary(app.salary_min, app.salary_max) }}
                </span>
              </div>

              <!-- Next Action snippet if available -->
              <div *ngIf="app.next_action" class="p-2 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 text-[11px] text-violet-700 dark:text-violet-300 line-clamp-1">
                📌 {{ app.next_action }}
              </div>
            </div>

            <!-- Empty Column Placeholder -->
            <div *ngIf="getFilteredAppsForColumn(col.id).length === 0" class="p-6 text-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 text-gray-400 text-xs">
              Drop applications here
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class KanbanComponent {
  appService = inject(ApplicationService);

  searchQuery = '';
  toastMessage = signal('');

  columns: KanbanColumn[] = [
    { id: 'Wishlist', title: 'Wishlist', badgeColor: '#94a3b8' },
    { id: 'Applied', title: 'Applied', badgeColor: '#3b82f6' },
    { id: 'Screening', title: 'Screening', badgeColor: '#f59e0b' },
    { id: 'Technical Interview', title: 'Technical Interview', badgeColor: '#8b5cf6' },
    { id: 'Final Interview', title: 'Final Interview', badgeColor: '#ec4899' },
    { id: 'Offer', title: 'Offer 🎉', badgeColor: '#10b981' },
    { id: 'Rejected', title: 'Rejected', badgeColor: '#ef4444' }
  ];

  get columnIds(): string[] {
    return this.columns.map(c => c.id);
  }

  getFilteredAppsForColumn(columnId: ApplicationStatus): Application[] {
    const apps = this.appService.applications().filter(a => a.status === columnId);
    if (!this.searchQuery.trim()) return apps;
    const q = this.searchQuery.toLowerCase();
    return apps.filter(a =>
      a.position.toLowerCase().includes(q) ||
      a.company_name.toLowerCase().includes(q)
    );
  }

  onCardDropped(event: CdkDragDrop<Application[]>, targetStatus: ApplicationStatus) {
    const app = event.item.data as Application;
    if (!app) return;

    if (app.status !== targetStatus) {
      const prevStatus = app.status;
      // Optimistically update status in ApplicationService and send PATCH request to PostgreSQL
      this.appService.updateApplicationStatus(app.id, targetStatus);

      this.toastMessage.set(`Moved "${app.position}" at ${app.company_name} to ${targetStatus}`);
      setTimeout(() => this.toastMessage.set(''), 4000);
    }
  }

  formatSalary(min?: number, max?: number): string {
    if (!min && !max) return '';
    const minK = min ? `${Math.round(min / 1000)}k` : '';
    const maxK = max ? `${Math.round(max / 1000)}k` : '';
    if (minK && maxK) return `$${minK}-$${maxK}`;
    return `$${minK || maxK}`;
  }
}
