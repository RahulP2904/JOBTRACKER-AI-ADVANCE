import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users, Mail, Phone, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contacts & Networking</h1>
        <p class="text-sm text-gray-500 mt-0.5">Track recruiters, hiring managers, and internal referrals.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let ct of contacts" class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-base text-gray-900 dark:text-white">{{ ct.name }}</h3>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300">
              {{ ct.relationship_type }}
            </span>
          </div>
          <p class="text-xs text-gray-500">{{ ct.position }} @ {{ ct.company }}</p>
          <div class="pt-2 text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <lucide-icon name="mail" [size]="14"></lucide-icon>
            <span>{{ ct.email }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactsComponent {
  contacts = [
    { name: 'Sarah Jenkins', position: 'Tech Recruiter', company: 'Stripe', email: 'sarah.j@stripe.com', relationship_type: 'Recruiter' },
    { name: 'Alex Rivera', position: 'Engineering Director', company: 'Vercel', email: 'alex.r@vercel.com', relationship_type: 'Hiring Manager' },
    { name: 'David Chen', position: 'Staff Systems Engineer', company: 'Linear', email: 'david.c@linear.app', relationship_type: 'Referral' }
  ];
}
