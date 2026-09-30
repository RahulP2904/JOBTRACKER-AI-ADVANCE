import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, UserCheck, Clock, CheckSquare, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Interview Center</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage interview countdowns, preparation checklists, and STAR stories.</p>
      </div>

      <!-- Upcoming Featured Interview Card -->
      <div class="p-6 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
            <lucide-icon name="clock" [size]="14"></lucide-icon>
            <span>Countdown: 24 Hours Remaining</span>
          </div>
          <h2 class="text-2xl font-extrabold">Vercel — Lead Frontend Architect</h2>
          <p class="text-xs text-purple-100">Final Round with VP Engineering • Scheduled for Sep 24 at 2:00 PM PST</p>
        </div>

        <button class="px-5 py-3 rounded-2xl bg-white text-purple-700 font-bold text-sm shadow-md hover:bg-purple-50 transition shrink-0">
          Launch Zoom Meeting
        </button>
      </div>

      <!-- STAR Method Preparation Checklist -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <h3 class="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <lucide-icon name="check-square" [size]="18" class="text-purple-600"></lucide-icon>
            <span>Interview Preparation Checklist</span>
          </h3>

          <div class="space-y-3">
            <label *ngFor="let item of checklist" class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-xs font-medium cursor-pointer">
              <input type="checkbox" [checked]="item.done" (change)="item.done = !item.done" class="rounded text-purple-600 focus:ring-purple-500" />
              <span [class.line-through]="item.done" [class.opacity-60]="item.done">{{ item.label }}</span>
            </label>
          </div>
        </div>

        <!-- STAR Questions Bank -->
        <div class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <h3 class="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <lucide-icon name="sparkles" [size]="18" class="text-amber-500"></lucide-icon>
            <span>STAR Behavioral Question Bank</span>
          </h3>

          <div class="space-y-3 text-xs">
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 space-y-2">
              <div class="font-bold text-gray-900 dark:text-white">"Tell me about a complex technical refactor."</div>
              <p class="text-gray-600 dark:text-gray-300">
                **Situation**: Legacy Angular codebase had slow render times.<br/>
                **Action**: Introduced Angular Signals and OnPush strategy.<br/>
                **Result**: 50% CPU load reduction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InterviewsComponent {
  checklist = [
    { label: 'Research company engineering blog & tech stack', done: true },
    { label: 'Review STAR behavioral stories for architecture decisions', done: true },
    { label: 'Prepare 3 thoughtful questions for the VP of Engineering', done: false },
    { label: 'Test webcam, microphone, and internet bandwidth', done: false }
  ];
}
