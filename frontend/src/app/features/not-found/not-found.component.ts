import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 flex items-center justify-center p-4 text-white">
      <div class="text-center">
        <div class="text-8xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-4">404</div>
        <h1 class="text-3xl font-bold mb-3">Page Not Found</h1>
        <p class="text-gray-400 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist. Maybe you took a wrong turn in your job search journey?</p>
        <div class="flex gap-3 justify-center">
          <a routerLink="/dashboard" class="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-colors">
            Go to Dashboard
          </a>
          <a routerLink="/" class="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-xl transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
