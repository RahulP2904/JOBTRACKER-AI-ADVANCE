import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 flex items-center justify-center p-4">

      <!-- Background decorations -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="relative w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <a routerLink="/" class="inline-flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">JF</div>
            <span class="text-xl font-bold text-white">JobFlow</span>
          </a>
          <h1 class="text-2xl font-bold text-white">
            {{ mode() === 'login' ? 'Sign In to Your Workspace' : 'Create Your JobFlow Account' }}
          </h1>
          <p class="text-gray-400 text-sm mt-1">
            {{ mode() === 'login' ? 'Enter your credentials to access your applications' : 'Start tracking applications and discover AI-matched roles' }}
          </p>
        </div>

        <!-- Card -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <!-- Already Signed In Prompt -->
          <div *ngIf="authService.isAuthenticated()" class="mb-6 p-4 rounded-2xl bg-violet-950/70 border border-violet-500/40 text-center space-y-2.5">
            <div class="text-xs text-gray-300">You are currently signed in as:</div>
            <div class="text-sm font-mono font-bold text-violet-300">{{ authService.currentUser()?.email }}</div>
            <div class="flex items-center justify-center gap-2 pt-1">
              <a routerLink="/dashboard" class="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs rounded-xl transition shadow-xs">
                Continue to Dashboard →
              </a>
              <button type="button" (click)="signOutAndSwitch()" class="px-3.5 py-1.5 border border-white/20 hover:bg-white/10 text-gray-300 text-xs rounded-xl transition">
                Sign Out
              </button>
            </div>
          </div>

          <!-- Error Alert -->
          <div *ngIf="error()" class="mb-5 flex items-center gap-2.5 p-3.5 bg-red-500/20 border border-red-500/40 text-red-200 rounded-xl text-sm animate-in fade-in">
            <svg class="w-4 h-4 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ error() }}</span>
          </div>

          <!-- Success Alert -->
          <div *ngIf="successMsg()" class="mb-5 flex items-center gap-2.5 p-3.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 rounded-xl text-sm animate-in fade-in">
            <svg class="w-4 h-4 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>{{ successMsg() }}</span>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submit()" class="space-y-4">
            <!-- Register only: Full Name -->
            <div *ngIf="mode() === 'register'">
              <label class="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input 
                [(ngModel)]="form.full_name" 
                name="full_name"
                type="text" 
                required
                placeholder="e.g. Alex Johnson"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>

            <!-- Email Address -->
            <div>
              <label class="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Email Address *</label>
              <input 
                [(ngModel)]="form.email" 
                name="email"
                type="email" 
                required
                placeholder="you@example.com"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>

            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password *</label>
              </div>
              <div class="relative">
                <input 
                  [(ngModel)]="form.password" 
                  name="password"
                  [type]="showPass() ? 'text' : 'password'" 
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all pr-12"
                />
                <button 
                  type="button" 
                  (click)="showPass.set(!showPass())" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path *ngIf="!showPass()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    <path *ngIf="showPass()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit Button (Requires Credentials) -->
            <button 
              type="submit" 
              [disabled]="loading()"
              class="w-full mt-2 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-violet-500/30 flex items-center justify-center gap-2"
            >
              <span *ngIf="!loading()">{{ mode() === 'login' ? 'Sign In' : 'Create Account' }}</span>
              <span *ngIf="loading()" class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {{ mode() === 'login' ? 'Verifying credentials...' : 'Creating account...' }}
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
            <div class="relative flex justify-center text-xs text-gray-500">
              <span class="bg-transparent px-3">or demo credentials</span>
            </div>
          </div>

          <!-- Demo Credentials Helper (Fills form only, does NOT auto-submit) -->
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <p class="text-xs text-gray-400 font-medium">Test Demo Account:</p>
            <div class="space-y-1 text-xs text-gray-300 font-mono">
              <div class="flex justify-between">
                <span class="text-gray-500">Email:</span>
                <span>rahul&#64;jobflow.dev</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Password:</span>
                <span>password123</span>
              </div>
            </div>
            <button 
              type="button" 
              (click)="fillDemoCredentials()" 
              [disabled]="loading()"
              class="mt-2 w-full py-2 border border-white/20 hover:border-violet-400/50 text-gray-300 hover:text-white text-xs font-medium rounded-lg transition-all hover:bg-white/5 disabled:opacity-50"
            >
              Fill Demo Credentials into Form
            </button>
          </div>

          <!-- Mode Toggle -->
          <p class="text-center text-sm text-gray-400 mt-6">
            {{ mode() === 'login' ? "Don't have an account?" : 'Already have an account?' }}
            <button type="button" (click)="toggleMode()" class="text-violet-400 hover:text-violet-300 font-medium ml-1 transition-colors">
              {{ mode() === 'login' ? 'Sign up' : 'Sign in' }}
            </button>
          </p>
        </div>

        <!-- Back to home -->
        <div class="text-center mt-6">
          <a routerLink="/" class="text-sm text-gray-500 hover:text-gray-400 transition-colors">← Back to home</a>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent implements OnInit {
  authService = inject(AuthService);
  appService = inject(ApplicationService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  mode = signal<'login' | 'register'>('login');
  showPass = signal(false);
  loading = signal(false);
  error = signal('');
  successMsg = signal('');

  form = { full_name: '', email: '', password: '' };

  ngOnInit() {
    const url = this.router.url;
    if (url.includes('register')) {
      this.mode.set('register');
    }
  }

  toggleMode() {
    this.mode.update(m => m === 'login' ? 'register' : 'login');
    this.error.set('');
    this.successMsg.set('');
    this.form = { full_name: '', email: '', password: '' };
  }

  fillDemoCredentials() {
    this.mode.set('login');
    this.form.email = 'rahul@jobflow.dev';
    this.form.password = 'password123';
    this.error.set('');
    this.successMsg.set('Demo credentials filled into form. Click "Sign In" to authenticate.');
  }

  signOutAndSwitch() {
    this.authService.logout();
    this.form = { full_name: '', email: '', password: '' };
    this.error.set('');
    this.successMsg.set('Signed out. Please enter your credentials to log in.');
  }

  async submit() {
    this.error.set('');
    this.successMsg.set('');

    const email = this.form.email.trim();
    const password = this.form.password;

    // Strict validation
    if (!email) {
      this.error.set('Please enter your email address.');
      return;
    }
    if (!email.includes('@')) {
      this.error.set('Please enter a valid email address.');
      return;
    }
    if (!password) {
      this.error.set('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      this.error.set('Password must be at least 6 characters.');
      return;
    }
    if (this.mode() === 'register' && !this.form.full_name.trim()) {
      this.error.set('Please enter your full name.');
      return;
    }

    this.loading.set(true);

    try {
      if (this.mode() === 'login') {
        // Send real HTTP POST to backend /api/v1/auth/login
        const result = await this.authService.login({
          email: email,
          password: password
        });

        if (result.success) {
          // Success: notify application service to load this specific user's data
          this.appService.loadUserBackendData();
          this.successMsg.set('Authentication successful! Loading your workspace...');
          setTimeout(() => this.router.navigate(['/dashboard']), 400);
        } else {
          // Authentication failed on backend: display exact error, do NOT redirect!
          this.error.set(result.error || 'Authentication failed. Please check your email and password.');
        }
      } else {
        // Send real HTTP POST to backend /api/v1/auth/register
        const result = await this.authService.register({
          email: email,
          password: password,
          full_name: this.form.full_name.trim()
        });

        if (result.success) {
          this.appService.loadUserBackendData();
          this.successMsg.set('Account registered successfully! Redirecting...');
          setTimeout(() => this.router.navigate(['/dashboard']), 400);
        } else {
          this.error.set(result.error || 'Registration failed. Email may already be in use.');
        }
      }
    } finally {
      this.loading.set(false);
    }
  }
}
