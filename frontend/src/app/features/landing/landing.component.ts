import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 text-white overflow-x-hidden">

      <!-- Nav -->
      <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold">JF</div>
            <span class="font-bold text-lg">JobFlow</span>
            <span class="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/30">Premium</span>
          </div>
          <div class="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" class="hover:text-white transition-colors">Features</a>
            <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
            <a href="#about" class="hover:text-white transition-colors">About</a>
          </div>
          <div class="flex items-center gap-3">
            <a routerLink="/auth/login" class="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2 border border-white/10 hover:border-white/20 rounded-xl">
              Sign In
            </a>
            <a routerLink="/auth/register" class="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors shadow-xs">
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <section class="pt-32 pb-20 px-6">
        <div class="max-w-5xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <span class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></span>
            AI-Powered Job Search Platform
          </div>
          <h1 class="text-5xl md:text-7xl font-black leading-tight mb-6">
            Land Your Dream Job
            <span class="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">10x Faster</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The most advanced job search tracker with AI-powered insights, application management, interview prep, and career analytics — all in one beautiful platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/auth/login"
              class="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-2xl text-lg transition-all hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 transform">
              Sign In to Dashboard →
            </a>
            <a routerLink="/auth/register"
              class="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-2xl text-lg transition-all hover:bg-white/5">
              Create Free Account
            </a>
            <button (click)="demoVisible.set(true)"
              class="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-2xl text-lg transition-all hover:bg-white/5">
              Watch Demo ▶
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-4">No credit card required • Free forever plan available</p>
        </div>

        <!-- Hero Image / Dashboard Preview -->
        <div class="max-w-6xl mx-auto mt-16 relative">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 bottom-0 top-1/2"></div>
          <div class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
            <!-- Mock Dashboard -->
            <div class="grid grid-cols-4 gap-4 mb-6">
              <div *ngFor="let stat of heroStats" class="bg-white/5 border border-white/10 rounded-xl p-4">
                <div class="text-2xl font-bold" [style.color]="stat.color">{{ stat.value }}</div>
                <div class="text-xs text-gray-500 mt-0.5">{{ stat.label }}</div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 h-40 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-4xl mb-2">📊</div>
                  <div class="text-sm text-gray-400">Analytics Dashboard</div>
                </div>
              </div>
              <div class="space-y-3">
                <div *ngFor="let app of heroApps" class="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-sm">{{ app.icon }}</div>
                  <div>
                    <div class="text-xs font-medium text-white">{{ app.company }}</div>
                    <div class="text-xs text-gray-500">{{ app.status }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto">Powerful tools designed for the modern job seeker</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let feature of features"
              class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group">
              <div class="text-4xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
              <p class="text-sm text-gray-400 leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-16 px-6 border-y border-white/10 bg-white/5">
        <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div *ngFor="let stat of stats">
            <div class="text-4xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{{ stat.value }}</div>
            <div class="text-sm text-gray-400 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing" class="py-20 px-6">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p class="text-gray-400">Start free, upgrade when you're ready</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div *ngFor="let plan of plans"
              class="rounded-2xl p-6 border transition-all"
              [class]="plan.featured ? 'bg-gradient-to-br from-violet-600/30 to-purple-600/20 border-violet-500/50 scale-105 relative' : 'bg-white/5 border-white/10'">
              <div *ngIf="plan.featured" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div class="text-lg font-bold text-white mb-1">{{ plan.name }}</div>
              <div class="text-4xl font-black text-white mb-1">
                {{ plan.price }}<span class="text-lg font-normal text-gray-400">/mo</span>
              </div>
              <div class="text-sm text-gray-400 mb-6">{{ plan.description }}</div>
              <ul class="space-y-2 mb-6">
                <li *ngFor="let f of plan.features" class="flex items-center gap-2 text-sm text-gray-300">
                  <svg class="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ f }}
                </li>
              </ul>
              <a routerLink="/auth/register"
                class="block text-center py-3 rounded-xl text-sm font-semibold transition-all"
                [class]="plan.featured ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'border border-white/20 hover:border-white/40 text-white hover:bg-white/5'">
                {{ plan.cta }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-4xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
          <p class="text-gray-400 text-lg mb-8">Join thousands of job seekers who've landed their dream roles with JobFlow</p>
          <a routerLink="/auth/register"
            class="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-2xl text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-1 transform">
            Get Started for Free →
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-white/10 py-8 px-6 text-center text-sm text-gray-500">
        <p>© 2025 JobFlow Premium. Built with ❤️ for ambitious job seekers.</p>
      </footer>

      <!-- Demo Modal -->
      <div *ngIf="demoVisible()" (click)="demoVisible.set(false)"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-gray-900 border border-white/20 rounded-3xl p-8 max-w-lg w-full text-center" (click)="$event.stopPropagation()">
          <div class="text-6xl mb-4">🎬</div>
          <h3 class="text-xl font-bold text-white mb-2">Demo Coming Soon</h3>
          <p class="text-gray-400 text-sm mb-6">Sign up now to experience JobFlow firsthand!</p>
          <a routerLink="/auth/register" class="block py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
            Start Free Trial
          </a>
        </div>
      </div>
    </div>
  `
})
export class LandingComponent {
  authService = inject(AuthService);
  demoVisible = signal(false);

  heroStats = [
    { value: '247', label: 'Applications', color: '#8b5cf6' },
    { value: '18', label: 'Interviews', color: '#3b82f6' },
    { value: '92%', label: 'Response Rate', color: '#10b981' },
    { value: '3', label: 'Offers', color: '#f59e0b' },
  ];

  heroApps = [
    { icon: '🏢', company: 'Google', status: 'Interview Stage' },
    { icon: '🍎', company: 'Apple', status: 'Applied' },
    { icon: '📘', company: 'Meta', status: 'Offer Received' },
  ];

  features = [
    { icon: '🤖', title: 'AI-Powered Insights', desc: 'Get personalized recommendations, resume scoring, and interview prep powered by Gemini AI.' },
    { icon: '📊', title: 'Advanced Analytics', desc: 'Deep dive into your job search performance with beautiful charts and actionable insights.' },
    { icon: '📋', title: 'Kanban Board', desc: 'Visualize your pipeline from application to offer with drag-and-drop kanban boards.' },
    { icon: '📅', title: 'Interview Calendar', desc: 'Never miss an interview. Sync with Google Calendar and get smart reminders.' },
    { icon: '🏢', title: 'Company Research', desc: 'Rich company profiles with culture info, news, and salary benchmarks.' },
    { icon: '📄', title: 'Document Manager', desc: 'Store and organize all your resumes, cover letters, and certifications in one place.' },
    { icon: '🤝', title: 'Network Tracker', desc: 'Manage your professional contacts and track networking conversations.' },
    { icon: '🎯', title: 'Goal Setting', desc: 'Set weekly and monthly goals. Track your progress and stay motivated.' },
    { icon: '💰', title: 'Offer Comparison', desc: 'Compare offers side by side with salary, benefits, and growth potential analysis.' },
  ];

  stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '2M+', label: 'Applications Tracked' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '89%', label: 'Success Rate' },
  ];

  plans = [
    {
      name: 'Free', price: '\$0', featured: false, description: 'Perfect for getting started',
      features: ['Up to 50 applications', 'Basic analytics', 'Kanban board', 'Email support'],
      cta: 'Get Started Free'
    },
    {
      name: 'Pro', price: '\$12', featured: true, description: 'For serious job seekers',
      features: ['Unlimited applications', 'AI insights & suggestions', 'Advanced analytics', 'Calendar sync', 'Priority support', 'Document storage 10GB'],
      cta: 'Start Pro Trial'
    },
    {
      name: 'Team', price: '\$29', featured: false, description: 'For career coaches & teams',
      features: ['Everything in Pro', 'Multiple users', 'Shared dashboards', 'Custom branding', 'API access', 'Dedicated support'],
      cta: 'Contact Sales'
    },
  ];
}
