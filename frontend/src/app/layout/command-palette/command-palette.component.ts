import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Search, LayoutDashboard, Briefcase, Plus, Calendar, BarChart3, Settings, LogOut } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4" (click)="close.emit()">
      <div 
        (click)="$event.stopPropagation()"
        class="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in zoom-in duration-150"
      >
        <!-- Search Input Header -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <lucide-icon name="search" [size]="20" class="text-gray-400 shrink-0"></lucide-icon>
          <input 
            type="text" 
            placeholder="Type a command or search workspace..." 
            class="w-full bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
            [(ngModel)]="query"
            autoFocus
          />
          <kbd class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 rounded">ESC</kbd>
        </div>

        <!-- Command List -->
        <div class="p-2 max-h-80 overflow-y-auto space-y-1">
          <div class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Navigation</div>
          
          <button 
            (click)="navigate('/dashboard')" 
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 transition text-left"
          >
            <lucide-icon name="layout-dashboard" [size]="18"></lucide-icon>
            <span>Go to Dashboard</span>
          </button>

          <button 
            (click)="navigate('/applications')" 
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 transition text-left"
          >
            <lucide-icon name="briefcase" [size]="18"></lucide-icon>
            <span>Go to Applications</span>
          </button>

          <button 
            (click)="navigate('/analytics')" 
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 transition text-left"
          >
            <lucide-icon name="bar-chart-3" [size]="18"></lucide-icon>
            <span>Open Career Analytics</span>
          </button>

          <div class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-2">Actions</div>

          <button 
            (click)="triggerQuickAdd()" 
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 transition text-left"
          >
            <lucide-icon name="plus" [size]="18"></lucide-icon>
            <span>Add New Application</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class CommandPaletteComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openQuickAdd = new EventEmitter<void>();

  query = '';
  router = inject(Router);
  authService = inject(AuthService);

  navigate(path: string) {
    this.router.navigateByUrl(path);
    this.close.emit();
  }

  triggerQuickAdd() {
    this.close.emit();
    this.openQuickAdd.emit();
  }
}
