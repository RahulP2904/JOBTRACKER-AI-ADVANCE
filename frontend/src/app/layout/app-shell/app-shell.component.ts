import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';
import { CommandPaletteComponent } from '../command-palette/command-palette.component';
import { QuickAddComponent } from '../quick-add/quick-add.component';
import { AIDrawerComponent } from '../ai-drawer/ai-drawer.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SidebarComponent, 
    TopbarComponent, 
    MobileNavComponent,
    CommandPaletteComponent,
    QuickAddComponent,
    AIDrawerComponent
  ],
  template: `
    <div class="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-sans antialiased">
      <!-- Desktop Sidebar -->
      <app-sidebar class="hidden md:block shrink-0"></app-sidebar>

      <!-- Main Layout -->
      <div class="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <app-topbar 
          (openSearch)="showSearch = true" 
          (openQuickAdd)="showQuickAdd = true"
        ></app-topbar>

        <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Mobile Nav -->
      <app-mobile-nav></app-mobile-nav>

      <!-- Modals & Drawers -->
      <app-command-palette 
        *ngIf="showSearch" 
        (close)="showSearch = false"
        (openQuickAdd)="showQuickAdd = true"
      ></app-command-palette>

      <app-quick-add 
        *ngIf="showQuickAdd" 
        (close)="showQuickAdd = false"
      ></app-quick-add>

      <app-ai-drawer></app-ai-drawer>
    </div>
  `
})
export class AppShellComponent {
  showSearch = false;
  showQuickAdd = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key?.toLowerCase();
    const targetEl = event.target as HTMLElement;
    const tagName = targetEl?.tagName?.toLowerCase() || '';

    if ((event.metaKey || event.ctrlKey) && key === 'k') {
      event.preventDefault();
      this.showSearch = !this.showSearch;
    }
    if (key === 'n' && !['input', 'textarea', 'select'].includes(tagName) && !targetEl?.isContentEditable) {
      event.preventDefault();
      this.showQuickAdd = true;
    }
  }
}
