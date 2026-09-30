import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Award, DollarSign, Check, X } from 'lucide-angular';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Offer Evaluation & Comparison</h1>
        <p class="text-sm text-gray-500 mt-0.5">Compare compensation, equity, bonus, and benefits across formal offers.</p>
      </div>

      <!-- Offers Matrix Card -->
      <div class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div *ngFor="let offer of offers" class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  {{ offer.status }}
                </span>
                <h3 class="text-xl font-extrabold text-gray-900 dark:text-white mt-2">{{ offer.company_name }}</h3>
                <p class="text-xs text-gray-500">{{ offer.position }}</p>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Base Salary</span>
                <span class="font-bold font-mono text-emerald-600">\${{ offer.base_salary | number }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Signing Bonus</span>
                <span class="font-bold font-mono">\${{ offer.bonus | number }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Equity Grant</span>
                <span class="font-bold text-xs">{{ offer.equity }}</span>
              </div>
            </div>

            <p class="text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-700">
              {{ offer.benefits }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OffersComponent {
  offers = [
    {
      company_name: 'Stripe',
      position: 'Senior Full Stack Architect',
      base_salary: 195000,
      bonus: 25000,
      equity: '$120,000 RSUs (4 yr vest)',
      benefits: 'Unlimited PTO, $3,000 yearly education, 401k 6% match, full health.',
      status: 'Pending'
    }
  ];
}
