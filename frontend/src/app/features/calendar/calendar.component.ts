import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, Plus } from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';

interface CalendarDay {
  dateNumber: number;
  fullDateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Array<{ id: string; title: string; type: string; time?: string }>;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Calendar Schedule</h1>
          <p class="text-sm text-gray-500 mt-0.5">Track upcoming interviews, follow-ups, and application deadlines.</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Month / Week View Switcher Buttons -->
          <div class="flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-1 shadow-xs">
            <button
              (click)="activeView.set('month')"
              [ngClass]="activeView() === 'month' ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
              class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer">
              Month
            </button>
            <button
              (click)="activeView.set('week')"
              [ngClass]="activeView() === 'week' ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
              class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer">
              Week
            </button>
          </div>

          <!-- Today Reset Button -->
          <button
            (click)="goToToday()"
            class="px-3.5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Today
          </button>
        </div>
      </div>

      <!-- Calendar Container -->
      <div class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden p-6">
        <!-- Month Navigation Header -->
        <div class="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">
            {{ formattedMonthYear() }}
          </h3>

          <div class="flex items-center gap-2">
            <button
              (click)="prevPeriod()"
              class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition cursor-pointer"
              title="Previous">
              <lucide-icon name="chevron-left" [size]="20"></lucide-icon>
            </button>
            <button
              (click)="nextPeriod()"
              class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition cursor-pointer"
              title="Next">
              <lucide-icon name="chevron-right" [size]="20"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Days of Week Header -->
        <div class="grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wider text-gray-400 py-3 border-b border-gray-100 dark:border-gray-800">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <!-- MONTH VIEW GRID -->
        <div *ngIf="activeView() === 'month'" class="grid grid-cols-7 gap-2 pt-3 text-xs min-h-[420px]">
          <div
            *ngFor="let day of calendarDays()"
            [ngClass]="{
              'opacity-30': !day.isCurrentMonth,
              'bg-violet-50/50 dark:bg-violet-950/30 border-violet-500/50 ring-2 ring-violet-500/30': day.isToday,
              'bg-white dark:bg-gray-900': !day.isToday && day.isCurrentMonth
            }"
            class="p-2 min-h-[90px] rounded-2xl border border-gray-100 dark:border-gray-800/80 space-y-1.5 flex flex-col justify-between hover:border-violet-300 dark:hover:border-violet-800 transition">
            
            <div class="flex items-center justify-between">
              <span
                class="font-bold text-xs inline-flex items-center justify-center w-6 h-6 rounded-full"
                [ngClass]="day.isToday ? 'bg-violet-600 text-white' : 'text-gray-900 dark:text-white'">
                {{ day.dateNumber }}
              </span>
            </div>

            <!-- Events List inside Day -->
            <div class="space-y-1 overflow-y-auto max-h-[60px]">
              <div
                *ngFor="let evt of day.events"
                class="p-1 rounded-lg text-[10px] font-semibold truncate flex items-center gap-1"
                [ngClass]="{
                  'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300': evt.type === 'interview',
                  'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300': evt.type === 'action'
                }">
                <span>•</span>
                <span class="truncate">{{ evt.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- WEEK VIEW GRID -->
        <div *ngIf="activeView() === 'week'" class="grid grid-cols-7 gap-2 pt-3 text-xs min-h-[420px]">
          <div
            *ngFor="let day of weekDays()"
            [ngClass]="{
              'bg-violet-50/50 dark:bg-violet-950/30 border-violet-500/50 ring-2 ring-violet-500/30': day.isToday,
              'bg-white dark:bg-gray-900': !day.isToday
            }"
            class="p-3 min-h-[350px] rounded-2xl border border-gray-100 dark:border-gray-800/80 space-y-2 flex flex-col justify-between">
            
            <div>
              <div class="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span
                  class="font-bold text-xs inline-flex items-center justify-center w-7 h-7 rounded-full"
                  [ngClass]="day.isToday ? 'bg-violet-600 text-white' : 'text-gray-900 dark:text-white'">
                  {{ day.dateNumber }}
                </span>
              </div>

              <!-- Events List inside Week Day -->
              <div class="space-y-2 pt-2">
                <div
                  *ngFor="let evt of day.events"
                  class="p-2 rounded-xl text-xs font-semibold space-y-0.5"
                  [ngClass]="{
                    'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300': evt.type === 'interview',
                    'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300': evt.type === 'action'
                  }">
                  <div class="font-bold truncate">{{ evt.title }}</div>
                  <div *ngIf="evt.time" class="text-[10px] opacity-80 flex items-center gap-1">
                    <lucide-icon name="clock" [size]="10"></lucide-icon>
                    {{ evt.time }}
                  </div>
                </div>
                <div *ngIf="day.events.length === 0" class="text-[11px] text-gray-400 italic text-center py-4">
                  No events scheduled
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarComponent {
  appService = inject(ApplicationService);

  currentDate = signal(new Date());
  activeView = signal<'month' | 'week'>('month');

  formattedMonthYear = computed(() => {
    const d = this.currentDate();
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  goToToday() {
    this.currentDate.set(new Date());
  }

  prevPeriod() {
    const d = new Date(this.currentDate());
    if (this.activeView() === 'month') {
      d.setMonth(d.getMonth() - 1);
    } else {
      d.setDate(d.getDate() - 7);
    }
    this.currentDate.set(d);
  }

  nextPeriod() {
    const d = new Date(this.currentDate());
    if (this.activeView() === 'month') {
      d.setMonth(d.getMonth() + 1);
    } else {
      d.setDate(d.getDate() + 7);
    }
    this.currentDate.set(d);
  }

  // Calculate full month calendar grid (including padding days from prev/next months)
  calendarDays = computed<CalendarDay[]>(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    const result: CalendarDay[] = [];

    // 1. Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = totalDaysInPrevMonth - i;
      result.push({
        dateNumber: dayNum,
        fullDateStr: `${year}-${month}-${dayNum}`,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }

    // 2. Current month days
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === dayNum;

      // Extract events from applications
      const events: Array<{ id: string; title: string; type: string; time?: string }> = [];
      this.appService.applications().forEach(app => {
        if (app.next_action_date) {
          const appDate = new Date(app.next_action_date);
          if (appDate.getFullYear() === year && appDate.getMonth() === month && appDate.getDate() === dayNum) {
            events.push({
              id: app.id,
              title: `${app.company_name} - ${app.position}`,
              type: app.status.includes('Interview') ? 'interview' : 'action',
              time: appDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      });

      result.push({
        dateNumber: dayNum,
        fullDateStr: `${year}-${month + 1}-${dayNum}`,
        isCurrentMonth: true,
        isToday: isToday,
        events: events
      });
    }

    // 3. Next month padding days to complete 35/42 grid cells
    const remainingCells = 42 - result.length;
    for (let i = 1; i <= remainingCells; i++) {
      result.push({
        dateNumber: i,
        fullDateStr: `${year}-${month + 2}-${i}`,
        isCurrentMonth: false,
        isToday: false,
        events: []
      });
    }

    return result;
  });

  // Calculate week view days
  weekDays = computed<CalendarDay[]>(() => {
    const d = new Date(this.currentDate());
    const dayOfWeek = d.getDay();
    const startOfWeek = new Date(d);
    startOfWeek.setDate(d.getDate() - dayOfWeek);

    const today = new Date();
    const week: CalendarDay[] = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);

      const isToday =
        today.getFullYear() === current.getFullYear() &&
        today.getMonth() === current.getMonth() &&
        today.getDate() === current.getDate();

      const events: Array<{ id: string; title: string; type: string; time?: string }> = [];
      this.appService.applications().forEach(app => {
        if (app.next_action_date) {
          const appDate = new Date(app.next_action_date);
          if (
            appDate.getFullYear() === current.getFullYear() &&
            appDate.getMonth() === current.getMonth() &&
            appDate.getDate() === current.getDate()
          ) {
            events.push({
              id: app.id,
              title: `${app.company_name} - ${app.position}`,
              type: app.status.includes('Interview') ? 'interview' : 'action',
              time: appDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      });

      week.push({
        dateNumber: current.getDate(),
        fullDateStr: current.toISOString().split('T')[0],
        isCurrentMonth: true,
        isToday: isToday,
        events: events
      });
    }

    return week;
  });
}
