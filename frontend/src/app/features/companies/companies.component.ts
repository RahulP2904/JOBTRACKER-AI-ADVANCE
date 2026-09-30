import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Building2, Globe, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Company Directory</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage target companies, industry domains, and application history.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let c of companies" class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 font-bold flex items-center justify-center">
              {{ c.name[0] }}
            </div>
            <div>
              <h3 class="font-bold text-base text-gray-900 dark:text-white">{{ c.name }}</h3>
              <p class="text-xs text-gray-500">{{ c.industry }}</p>
            </div>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{{ c.description }}</p>
        </div>
      </div>
    </div>
  `
})
export class CompaniesComponent {
  companies = [
    { name: 'Stripe', industry: 'Fintech / Payments', description: 'Financial infrastructure for the internet.' },
    { name: 'Vercel', industry: 'Cloud & Web Platform', description: 'Develop. Preview. Ship.' },
    { name: 'Linear', industry: 'Developer Tools', description: 'Issue tracking built for high velocity.' }
  ];
}
