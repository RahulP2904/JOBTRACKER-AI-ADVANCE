import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Check } from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-quick-add',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" (click)="close.emit()">
      <div 
        (click)="$event.stopPropagation()"
        class="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 animate-in fade-in zoom-in duration-150"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Quick Add Application</h3>
            <p class="text-xs text-gray-500">Track a new job opportunity in under 60 seconds.</p>
          </div>
          <button (click)="close.emit()" class="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <lucide-icon name="x" [size]="20"></lucide-icon>
          </button>
        </div>

        <!-- Form Body -->
        <form (ngSubmit)="submit()" class="py-4 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Position Title *</label>
              <input 
                type="text" 
                [(ngModel)]="position" 
                name="position" 
                required 
                placeholder="e.g. Senior Frontend Engineer" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company Name *</label>
              <input 
                type="text" 
                [(ngModel)]="company_name" 
                name="company_name" 
                required 
                placeholder="e.g. Stripe" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
              <select 
                [(ngModel)]="status" 
                name="status"
                class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Applied">Applied</option>
                <option value="Wishlist">Wishlist</option>
                <option value="Screening">Screening</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="Final Interview">Final Interview</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Priority</label>
              <select 
                [(ngModel)]="priority" 
                name="priority"
                class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Work Type</label>
              <select 
                [(ngModel)]="work_type" 
                name="work_type"
                class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Min Salary ($)</label>
              <input 
                type="number" 
                [(ngModel)]="salary_min" 
                name="salary_min" 
                placeholder="160000" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Max Salary ($)</label>
              <input 
                type="number" 
                [(ngModel)]="salary_max" 
                name="salary_max" 
                placeholder="200000" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Job Source</label>
              <select 
                [(ngModel)]="source" 
                name="source"
                class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Indeed">Indeed</option>
                <option value="Company Website">Company Website</option>
                <option value="Referral">Referral</option>
                <option value="Recruiter Outreach">Recruiter Outreach</option>
                <option value="Wellfound">Wellfound</option>
                <option value="Glassdoor">Glassdoor</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Notes / Initial Impressions</label>
            <textarea 
              [(ngModel)]="notes" 
              name="notes" 
              rows="2" 
              placeholder="Key technical topics, referral names, interview timeline..." 
              class="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            ></textarea>
          </div>

          <div class="pt-3 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800">
            <button 
              type="button" 
              (click)="close.emit()" 
              class="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm shadow-md shadow-violet-500/20 flex items-center gap-2"
            >
              <lucide-icon name="check" [size]="18"></lucide-icon>
              <span>Save Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class QuickAddComponent {
  @Output() close = new EventEmitter<void>();
  appService = inject(ApplicationService);

  position = '';
  company_name = '';
  status: any = 'Applied';
  priority: any = 'Medium';
  work_type: any = 'Remote';
  source: string = 'LinkedIn';
  salary_min: number | null = null;
  salary_max: number | null = null;
  notes = '';

  submit() {
    if (!this.position || !this.company_name) return;

    this.appService.addApplication({
      position: this.position,
      company_name: this.company_name,
      status: this.status,
      priority: this.priority,
      work_type: this.work_type,
      source: this.source,
      salary_min: this.salary_min || undefined,
      salary_max: this.salary_max || undefined,
      notes: this.notes
    });

    this.close.emit();
  }
}
