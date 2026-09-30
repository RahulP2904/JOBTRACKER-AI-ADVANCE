import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 flex items-center justify-center p-4">
      <div class="w-full max-w-lg">

        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-400">Step {{ currentStep() + 1 }} of {{ steps.length }}</span>
            <span class="text-sm text-violet-400 font-medium">{{ Math.round(((currentStep() + 1) / steps.length) * 100) }}%</span>
          </div>
          <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
              [style.width]="((currentStep() + 1) / steps.length * 100) + '%'">
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <div *ngFor="let step of steps; let i = index"
              class="flex flex-col items-center gap-1">
              <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-all"
                [class]="i < currentStep() ? 'bg-violet-500 border-violet-500 text-white' : i === currentStep() ? 'border-violet-500 bg-violet-500/20 text-violet-400' : 'border-white/20 text-gray-600'">
                <svg *ngIf="i < currentStep()" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span *ngIf="i >= currentStep()">{{ i + 1 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step Card -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <!-- Step 0: Welcome -->
          <div *ngIf="currentStep() === 0">
            <div class="text-center mb-8">
              <div class="text-6xl mb-4">👋</div>
              <h2 class="text-2xl font-bold text-white mb-2">Welcome to JobFlow!</h2>
              <p class="text-gray-400">Let's set up your profile to personalize your experience</p>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">What's your name?</label>
                <input [(ngModel)]="onboarding.name" type="text" placeholder="Alex Johnson"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Current job title or target role</label>
                <input [(ngModel)]="onboarding.targetRole" type="text" placeholder="e.g. Software Engineer"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
              </div>
            </div>
          </div>

          <!-- Step 1: Job Preferences -->
          <div *ngIf="currentStep() === 1">
            <div class="text-center mb-8">
              <div class="text-6xl mb-4">🎯</div>
              <h2 class="text-2xl font-bold text-white mb-2">Job Preferences</h2>
              <p class="text-gray-400">Help us tailor recommendations for you</p>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Work Type (select all that apply)</label>
                <div class="grid grid-cols-3 gap-2">
                  <button *ngFor="let type of workTypes"
                    (click)="toggleWorkType(type)"
                    class="py-2.5 px-3 text-sm rounded-xl border transition-all text-center"
                    [class]="onboarding.workTypes.includes(type) ? 'border-violet-500 bg-violet-500/20 text-violet-300' : 'border-white/20 text-gray-400 hover:border-white/30'">
                    {{ type }}
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Desired Salary Range (annual)</label>
                <select [(ngModel)]="onboarding.salary"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="" class="bg-gray-900">Select a range</option>
                  <option value="50-75k" class="bg-gray-900">\$50,000 - \$75,000</option>
                  <option value="75-100k" class="bg-gray-900">\$75,000 - \$100,000</option>
                  <option value="100-150k" class="bg-gray-900">\$100,000 - \$150,000</option>
                  <option value="150k+" class="bg-gray-900">\$150,000+</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 2: Set Goals -->
          <div *ngIf="currentStep() === 2">
            <div class="text-center mb-8">
              <div class="text-6xl mb-4">📈</div>
              <h2 class="text-2xl font-bold text-white mb-2">Set Your Goals</h2>
              <p class="text-gray-400">Define what success looks like for you</p>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Applications per week</label>
                <div class="flex items-center gap-4">
                  <input [(ngModel)]="onboarding.weeklyApps" type="range" min="1" max="20"
                    class="flex-1 accent-violet-500"/>
                  <span class="text-violet-400 font-bold text-xl w-8 text-center">{{ onboarding.weeklyApps }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Target timeline</label>
                <div class="grid grid-cols-2 gap-2">
                  <button *ngFor="let timeline of timelines"
                    (click)="onboarding.timeline = timeline"
                    class="py-2.5 px-3 text-sm rounded-xl border transition-all text-center"
                    [class]="onboarding.timeline === timeline ? 'border-violet-500 bg-violet-500/20 text-violet-300' : 'border-white/20 text-gray-400 hover:border-white/30'">
                    {{ timeline }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: All Set -->
          <div *ngIf="currentStep() === 3">
            <div class="text-center">
              <div class="text-7xl mb-4 animate-bounce">🎉</div>
              <h2 class="text-2xl font-bold text-white mb-2">You're all set, {{ onboarding.name || 'there' }}!</h2>
              <p class="text-gray-400 mb-6">Your personalized dashboard is ready. Let's start landing interviews!</p>

              <div class="bg-white/5 rounded-2xl p-4 text-left mb-6 space-y-3">
                <div class="flex items-center gap-3 text-sm">
                  <span class="text-green-400">✓</span>
                  <span class="text-gray-300">Profile configured as <strong class="text-white">{{ onboarding.targetRole || 'Job Seeker' }}</strong></span>
                </div>
                <div class="flex items-center gap-3 text-sm">
                  <span class="text-green-400">✓</span>
                  <span class="text-gray-300">Goal set: <strong class="text-white">{{ onboarding.weeklyApps }} applications/week</strong></span>
                </div>
                <div class="flex items-center gap-3 text-sm">
                  <span class="text-green-400">✓</span>
                  <span class="text-gray-300">AI insights and recommendations enabled</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex gap-3 mt-8">
            <button *ngIf="currentStep() > 0" (click)="prevStep()"
              class="flex-1 py-3 border border-white/20 hover:border-white/30 text-gray-300 text-sm font-medium rounded-xl transition-all hover:bg-white/5">
              ← Back
            </button>
            <button (click)="nextStep()"
              class="flex-1 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/30">
              {{ currentStep() === steps.length - 1 ? '🚀 Go to Dashboard' : 'Continue →' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OnboardingComponent {
  authService = inject(AuthService);
  router = inject(Router);
  Math = Math;

  currentStep = signal(0);

  steps: OnboardingStep[] = [
    { id: 'welcome', title: 'Welcome', subtitle: 'Tell us about yourself', icon: '👋' },
    { id: 'preferences', title: 'Preferences', subtitle: 'Job search preferences', icon: '🎯' },
    { id: 'goals', title: 'Goals', subtitle: 'Set your targets', icon: '📈' },
    { id: 'complete', title: 'Complete', subtitle: 'You\'re ready!', icon: '🎉' },
  ];

  workTypes = ['Remote', 'Hybrid', 'On-site', 'Full-time', 'Part-time', 'Contract'];
  timelines = ['1 month', '2-3 months', '3-6 months', '6+ months'];

  onboarding = {
    name: '',
    targetRole: '',
    workTypes: [] as string[],
    salary: '',
    weeklyApps: 5,
    timeline: '2-3 months',
  };

  toggleWorkType(type: string) {
    const idx = this.onboarding.workTypes.indexOf(type);
    if (idx > -1) {
      this.onboarding.workTypes.splice(idx, 1);
    } else {
      this.onboarding.workTypes.push(type);
    }
  }

  nextStep() {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.update(s => s + 1);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  prevStep() {
    this.currentStep.update(s => Math.max(0, s - 1));
  }
}
