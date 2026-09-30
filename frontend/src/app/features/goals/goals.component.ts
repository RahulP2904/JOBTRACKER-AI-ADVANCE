import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule, Target, CheckCircle2, TrendingUp, Plus, Trash2, X, PlusCircle, MinusCircle } from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';

export interface Goal {
  id: string;
  title: string;
  target_type: string;
  target_value: number;
  current_value: number;
  period: string;
  color?: string;
  unit?: string;
  category?: string;
}

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Goals & Milestones</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track your weekly and monthly job search objectives.</p>
        </div>
        <button
          (click)="showAddGoal.set(true)"
          class="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer active:scale-95">
          <lucide-icon name="plus" [size]="18"></lucide-icon>
          <span>Add Goal</span>
        </button>
      </div>

      <!-- Notification Banner -->
      <div *ngIf="notification()" class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm flex items-center justify-between animate-in fade-in">
        <div class="flex items-center gap-2.5">
          <lucide-icon name="check-circle-2" [size]="18" class="text-emerald-500"></lucide-icon>
          <span>{{ notification() }}</span>
        </div>
        <button (click)="notification.set('')" class="text-emerald-500 hover:text-emerald-700">
          <lucide-icon name="x" [size]="16"></lucide-icon>
        </button>
      </div>

      <!-- Progress Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Active Goals</span>
            <div class="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <lucide-icon name="target" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-gray-900 dark:text-white">{{ activeGoalsCount() }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Target objectives in progress</div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Completed Goals</span>
            <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <lucide-icon name="check-circle-2" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-emerald-600 dark:text-emerald-400">{{ completedGoalsCount() }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Milestones achieved</div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Average Completion</span>
            <div class="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <lucide-icon name="trending-up" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-violet-600 dark:text-violet-400">{{ avgProgress() }}%</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Across all tracking periods</div>
        </div>
      </div>

      <!-- Goals List -->
      <div *ngIf="goals().length > 0; else emptyState" class="space-y-4">
        <div *ngFor="let goal of goals()"
          class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <lucide-icon name="target" [size]="20"></lucide-icon>
              </div>
              <div>
                <h3 class="font-bold text-base text-gray-900 dark:text-white">{{ goal.title }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    {{ goal.target_type }}
                  </span>
                  <span class="text-xs text-gray-400">• {{ goal.period }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs px-2.5 py-1 rounded-full font-semibold"
                [ngClass]="{
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300': goal.current_value >= goal.target_value,
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300': goal.current_value < goal.target_value
                }">
                {{ goal.current_value >= goal.target_value ? 'Completed' : 'In Progress' }}
              </span>

              <!-- Delete Goal Button -->
              <button
                (click)="deleteGoal(goal.id)"
                class="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                title="Delete Goal">
                <lucide-icon name="trash-2" [size]="18"></lucide-icon>
              </button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-gray-600 dark:text-gray-400">
                Progress: {{ goal.current_value }} / {{ goal.target_value }}
              </span>
              <span class="text-violet-600 dark:text-violet-400 font-bold">
                {{ getProgress(goal) }}%
              </span>
            </div>
            <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500"
                [style.width]="getProgress(goal) + '%'">
              </div>
            </div>
          </div>

          <!-- Quick Update Controls -->
          <div class="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              (click)="updateGoalProgress(goal, -1)"
              [disabled]="goal.current_value <= 0"
              class="flex-1 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 rounded-xl transition-colors cursor-pointer">
              - Decrease
            </button>
            <button
              (click)="updateGoalProgress(goal, 1)"
              class="flex-1 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow-xs cursor-pointer">
              + Add Progress
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <ng-template #emptyState>
        <div class="p-12 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3 shadow-soft">
          <div class="w-16 h-16 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 flex items-center justify-center mx-auto">
            <lucide-icon name="target" [size]="32"></lucide-icon>
          </div>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">No Goals Configured</h3>
          <p class="text-xs text-gray-500 max-w-sm mx-auto">Set weekly or monthly target goals to maintain job search velocity.</p>
          <button (click)="showAddGoal.set(true)" class="px-4 py-2.5 rounded-xl bg-violet-600 text-white font-medium text-xs">
            Create Your First Goal
          </button>
        </div>
      </ng-template>

      <!-- Add Goal Modal -->
      <div *ngIf="showAddGoal()" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-150">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Add New Milestone Goal</h2>
            <button (click)="showAddGoal.set(false)" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <lucide-icon name="x" [size]="20"></lucide-icon>
            </button>
          </div>

          <!-- Modal Error Alert -->
          <div *ngIf="modalError()" class="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-medium">
            {{ modalError() }}
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Goal Title *</label>
              <input
                [(ngModel)]="newGoal.title"
                type="text"
                placeholder="e.g. Submit 20 job applications"
                class="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Target Count *</label>
                <input
                  [(ngModel)]="newGoal.target_value"
                  type="number"
                  min="1"
                  placeholder="20"
                  class="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tracking Period</label>
                <select
                  [(ngModel)]="newGoal.period"
                  class="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Goal Category</label>
              <select
                [(ngModel)]="newGoal.target_type"
                class="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="applications">Applications Target</option>
                <option value="interviews">Interviews Target</option>
                <option value="networking">Networking & Outreach</option>
                <option value="learning">Skills & Projects</option>
              </select>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-6">
            <button
              (click)="showAddGoal.set(false)"
              class="flex-1 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              (click)="addGoal()"
              class="flex-1 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow-xs">
              Save Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GoalsComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private appService = inject(ApplicationService);

  private readonly API = 'http://localhost:8000/api/v1';

  showAddGoal = signal(false);
  notification = signal('');
  modalError = signal('');

  goals = signal<Goal[]>([]);

  newGoal = {
    title: '',
    target_value: 10,
    target_type: 'applications',
    period: 'Monthly'
  };

  ngOnInit() {
    this.fetchGoals();
  }

  fetchGoals() {
    if (!this.authService.isAuthenticated()) return;
    const headers = this.authService.getAuthHeaders();
    this.http.get<Goal[]>(`${this.API}/goals`, { headers }).subscribe({
      next: (data) => this.goals.set(data || []),
      error: () => this.goals.set([])
    });
  }

  activeGoalsCount = computed(() =>
    this.goals().filter(g => g.current_value < g.target_value).length
  );

  completedGoalsCount = computed(() =>
    this.goals().filter(g => g.current_value >= g.target_value).length
  );

  avgProgress = computed(() => {
    const list = this.goals();
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, g) => acc + this.getProgress(g), 0);
    return Math.round(sum / list.length);
  });

  getProgress(goal: Goal): number {
    if (!goal.target_value || goal.target_value <= 0) return 0;
    return Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
  }

  addGoal() {
    this.modalError.set('');
    if (!this.newGoal.title.trim()) {
      this.modalError.set('Please enter a goal title.');
      return;
    }
    if (!this.newGoal.target_value || this.newGoal.target_value <= 0) {
      this.modalError.set('Target count must be greater than 0.');
      return;
    }

    const payload = {
      title: this.newGoal.title.trim(),
      target_type: this.newGoal.target_type,
      target_value: this.newGoal.target_value,
      current_value: 0,
      period: this.newGoal.period
    };

    const headers = this.authService.getAuthHeaders();
    this.http.post<Goal>(`${this.API}/goals`, payload, { headers }).subscribe({
      next: (created) => {
        this.goals.update(current => [created, ...current]);
        this.showAddGoal.set(false);
        this.newGoal = { title: '', target_value: 10, target_type: 'applications', period: 'Monthly' };
        this.notification.set(`Goal "${created.title}" successfully added!`);
        setTimeout(() => this.notification.set(''), 4000);
      },
      error: (err) => {
        // Fallback optimistic local update if offline
        const localGoal: Goal = {
          id: 'g-' + Date.now(),
          ...payload
        };
        this.goals.update(current => [localGoal, ...current]);
        this.showAddGoal.set(false);
        this.newGoal = { title: '', target_value: 10, target_type: 'applications', period: 'Monthly' };
        this.notification.set(`Goal "${localGoal.title}" added!`);
        setTimeout(() => this.notification.set(''), 4000);
      }
    });
  }

  updateGoalProgress(goal: Goal, delta: number) {
    const newCurrent = Math.max(0, goal.current_value + delta);
    this.goals.update(list =>
      list.map(g => g.id === goal.id ? { ...g, current_value: newCurrent } : g)
    );

    const headers = this.authService.getAuthHeaders();
    this.http.patch(`${this.API}/goals/${goal.id}`, { current_value: newCurrent }, { headers }).subscribe({
      error: (err) => console.warn('Goal update note:', err)
    });
  }

  deleteGoal(id: string) {
    const goalToDelete = this.goals().find(g => g.id === id);
    this.goals.update(list => list.filter(g => g.id !== id));

    const headers = this.authService.getAuthHeaders();
    this.http.delete(`${this.API}/goals/${id}`, { headers }).subscribe({
      next: () => {
        this.notification.set(`Goal deleted.`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        this.notification.set(`Goal deleted.`);
        setTimeout(() => this.notification.set(''), 3000);
      }
    });
  }
}
