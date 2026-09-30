import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Briefcase, Calendar, CheckSquare, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-4 flex items-center justify-around z-30">
      <a 
        routerLink="/dashboard" 
        routerLinkActive="text-violet-600 dark:text-violet-400 font-semibold"
        class="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 text-xs"
      >
        <lucide-icon name="layout-dashboard" [size]="20"></lucide-icon>
        <span>Home</span>
      </a>

      <a 
        routerLink="/applications" 
        routerLinkActive="text-violet-600 dark:text-violet-400 font-semibold"
        class="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 text-xs"
      >
        <lucide-icon name="briefcase" [size]="20"></lucide-icon>
        <span>Apps</span>
      </a>

      <a 
        routerLink="/calendar" 
        routerLinkActive="text-violet-600 dark:text-violet-400 font-semibold"
        class="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 text-xs"
      >
        <lucide-icon name="calendar" [size]="20"></lucide-icon>
        <span>Calendar</span>
      </a>

      <a 
        routerLink="/kanban" 
        routerLinkActive="text-violet-600 dark:text-violet-400 font-semibold"
        class="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 text-xs"
      >
        <lucide-icon name="check-square" [size]="20"></lucide-icon>
        <span>Kanban</span>
      </a>
    </nav>
  `
})
export class MobileNavComponent {}
