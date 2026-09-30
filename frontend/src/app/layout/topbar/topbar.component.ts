import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Search, Plus, Bell, Sparkles, User, LogOut } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { ApplicationService } from '../../core/services/application.service';
import { AIService } from '../../core/services/ai.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <header class="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between sticky top-0 z-20">
      <!-- Search Trigger -->
      <div class="flex items-center gap-4">
        <button 
          (click)="openSearch.emit()"
          class="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 text-sm hover:ring-2 hover:ring-violet-500/30 transition w-64 md:w-80 border border-gray-200/60 dark:border-gray-700/50"
        >
          <lucide-icon name="search" [size]="18" class="shrink-0"></lucide-icon>
          <span class="flex-1 text-left">Search applications, jobs...</span>
          <kbd class="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 shadow-sm">
            ⌘K
          </kbd>
        </button>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <!-- Quick Add Button -->
        <button 
          (click)="openQuickAdd.emit()"
          class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm shadow-md shadow-violet-500/20 transition active:scale-95"
        >
          <lucide-icon name="plus" [size]="18"></lucide-icon>
          <span class="hidden sm:inline">Add Application</span>
          <kbd class="hidden md:inline-block px-1.5 py-0.2 text-[10px] bg-violet-700/60 rounded font-mono">N</kbd>
        </button>

        <!-- AI Copilot Button -->
        <button 
          (click)="aiService.toggleDrawer()"
          class="relative p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 hover:opacity-90 transition"
          title="Career Copilot AI"
        >
          <lucide-icon name="sparkles" [size]="20"></lucide-icon>
        </button>

        <!-- Notification Dropdown Toggle -->
        <div class="relative">
          <button 
            (click)="showNotifs = !showNotifs"
            class="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <lucide-icon name="bell" [size]="20"></lucide-icon>
            <span *ngIf="unreadCount > 0" class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
          </button>

          <!-- Notifications Dropdown Menu -->
          <div *ngIf="showNotifs" class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 z-50">
            <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
              <h4 class="font-semibold text-sm">Notifications</h4>
              <span class="text-xs text-violet-600 font-medium cursor-pointer" (click)="showNotifs = false">Close</span>
            </div>
            <div class="py-2 space-y-3 max-h-64 overflow-y-auto">
              <div *ngFor="let item of appService.notifications()" class="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-xs space-y-1">
                <div class="font-semibold text-gray-900 dark:text-white flex justify-between">
                  <span>{{ item.title }}</span>
                  <span class="text-[10px] text-gray-400">Today</span>
                </div>
                <p class="text-gray-600 dark:text-gray-300">{{ item.message }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- User Profile Dropdown -->
        <div class="relative flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-800">
          <button (click)="showUserMenu = !showUserMenu" class="flex items-center gap-2 hover:opacity-80 transition">
            <div *ngIf="authService.currentUser()?.avatar_url; else initials"
              class="w-9 h-9 rounded-full ring-2 ring-violet-500/30 overflow-hidden">
              <img [src]="authService.currentUser()?.avatar_url" alt="Avatar" class="w-full h-full object-cover"/>
            </div>
            <ng-template #initials>
              <div class="w-9 h-9 rounded-full ring-2 ring-violet-500/30 bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
                {{ authService.currentUser()?.full_name?.[0] || 'U' }}
              </div>
            </ng-template>
            <div class="hidden md:block text-left">
              <div class="text-xs font-semibold leading-tight text-gray-900 dark:text-white">
                {{ authService.currentUser()?.full_name }}
              </div>
              <div class="text-[11px] text-gray-400 leading-tight">
                {{ authService.currentUser()?.email }}
              </div>
            </div>
          </button>

          <!-- User Dropdown -->
          <div *ngIf="showUserMenu" class="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 z-50">
            <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ authService.currentUser()?.full_name }}</div>
              <div class="text-xs text-gray-400 truncate">{{ authService.currentUser()?.email }}</div>
            </div>
            <a routerLink="/settings" (click)="showUserMenu=false"
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <lucide-icon name="settings" [size]="16"></lucide-icon>
              Settings
            </a>
            <hr class="my-1 border-gray-100 dark:border-gray-800">
            <button (click)="authService.logout()"
              class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
              <lucide-icon name="log-out" [size]="16"></lucide-icon>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class TopbarComponent {
  authService = inject(AuthService);
  appService = inject(ApplicationService);
  aiService = inject(AIService);

  @Output() openSearch = new EventEmitter<void>();
  @Output() openQuickAdd = new EventEmitter<void>();

  showNotifs = false;
  showUserMenu = false;

  get unreadCount() {
    return this.appService.notifications().filter(n => !n.is_read).length;
  }
}
