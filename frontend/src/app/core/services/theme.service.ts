import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<ThemeMode>('system');
  isDark = signal<boolean>(false);

  constructor() {
    const saved = (localStorage.getItem('jobflow_theme') as ThemeMode) || 'system';
    this.setTheme(saved);
    
    // Listen for OS system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.theme() === 'system') {
        this.applyDarkState(e.matches);
      }
    });
  }

  setTheme(mode: ThemeMode) {
    this.theme.set(mode);
    localStorage.setItem('jobflow_theme', mode);

    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyDarkState(systemDark);
    } else {
      this.applyDarkState(mode === 'dark');
    }
  }

  private applyDarkState(dark: boolean) {
    this.isDark.set(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
