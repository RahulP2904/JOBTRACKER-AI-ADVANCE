import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  LucideAngularModule, Search, Bookmark, ExternalLink, Plus, Sparkles,
  MapPin, DollarSign, Briefcase, Building2, CheckCircle2, Star, Filter,
  X, ArrowUpRight, Zap, Award, Layers, Globe, Shield, RefreshCw
} from 'lucide-angular';
import { ApplicationService } from '../../core/services/application.service';
import { Job } from '../../core/models/models';

interface DiscoveryJob extends Job {
  is_tracked?: boolean;
  why_you_match?: string[];
  responsibilities?: string[];
  benefits?: string[];
}

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Top Action & Title Bar -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Job Discovery</h1>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 flex items-center gap-1">
              <lucide-icon name="sparkles" [size]="12"></lucide-icon>
              <span>AI Matched</span>
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1">Explore verified tech opportunities matched to your skill profile & track applications instantly.</p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            (click)="showAiModal = true"
            class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium text-xs shadow-md shadow-violet-500/20 flex items-center gap-2 transition transform active:scale-95"
          >
            <lucide-icon name="sparkles" [size]="15"></lucide-icon>
            <span>Customize AI Match</span>
          </button>

          <button 
            (click)="showAddJobModal = true"
            class="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-xs hover:bg-gray-50 dark:hover:bg-gray-700/60 flex items-center gap-2 transition"
          >
            <lucide-icon name="plus" [size]="15"></lucide-icon>
            <span>Add Opportunity</span>
          </button>
        </div>
      </div>

      <!-- Search & Filters Container -->
      <div class="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
        <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
          <!-- Search Input -->
          <div class="relative w-full md:w-96 flex items-center">
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center z-10">
              <lucide-icon name="search" [size]="17"></lucide-icon>
            </div>
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              placeholder="Search by role, company, skill (e.g. Angular, Stripe)..." 
              class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button 
              *ngIf="searchQuery" 
              (click)="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <lucide-icon name="x" [size]="15"></lucide-icon>
            </button>
          </div>

          <!-- Secondary Filters Dropdowns -->
          <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select 
              [(ngModel)]="selectedWorkType" 
              class="px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-700 dark:text-gray-300"
            >
              <option value="All">All Locations</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>

            <select 
              [(ngModel)]="selectedExperience" 
              class="px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-700 dark:text-gray-300"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Staff">Staff / Lead</option>
            </select>
          </div>
        </div>

        <!-- Filter Tab Chips -->
        <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-800">
          <button 
            *ngFor="let tab of filterTabs"
            (click)="activeTab = tab.id"
            [ngClass]="activeTab === tab.id ? 'bg-violet-600 text-white font-semibold shadow-xs' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
            class="px-3.5 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5"
          >
            <span>{{ tab.label }}</span>
            <span 
              [ngClass]="activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'"
              class="px-1.5 py-0.2 rounded-full text-[10px]"
            >
              {{ getTabCount(tab.id) }}
            </span>
          </button>

          <!-- Active Skill Filter Pill (if any) -->
          <span 
            *ngIf="activeSkillFilter" 
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
          >
            <span>Skill: {{ activeSkillFilter }}</span>
            <button (click)="activeSkillFilter = null" class="hover:text-amber-900 dark:hover:text-white">
              <lucide-icon name="x" [size]="12"></lucide-icon>
            </button>
          </span>
        </div>
      </div>

      <!-- Notification Toast -->
      <div 
        *ngIf="toastMessage" 
        class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-soft animate-in slide-in-from-top duration-150"
      >
        <div class="flex items-center gap-2">
          <lucide-icon name="check-circle-2" [size]="16" class="text-emerald-500"></lucide-icon>
          <span>{{ toastMessage }}</span>
        </div>
        <button (click)="toastMessage = null" class="text-emerald-600 hover:text-emerald-800">
          <lucide-icon name="x" [size]="14"></lucide-icon>
        </button>
      </div>

      <!-- Jobs Grid -->
      <div *ngIf="filteredJobs.length > 0; else noJobsFound" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          *ngFor="let job of filteredJobs" 
          (click)="openJobDetail(job)"
          class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft hover:border-violet-400/60 dark:hover:border-violet-600/60 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
        >
          <!-- Top Card Row -->
          <div class="space-y-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <!-- Company Initial / Logo Badge -->
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold flex items-center justify-center shadow-xs text-sm">
                  {{ job.company_name.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <h3 class="font-bold text-base text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">
                    {{ job.title }}
                  </h3>
                  <p class="text-xs font-medium text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <span>{{ job.company_name }}</span>
                    <span>•</span>
                    <span class="flex items-center gap-0.5">
                      <lucide-icon name="map-pin" [size]="11"></lucide-icon>
                      {{ job.location }}
                    </span>
                  </p>
                </div>
              </div>

              <!-- Bookmark / Save Button -->
              <button 
                (click)="$event.stopPropagation(); toggleSaveJob(job)"
                class="p-2 rounded-xl text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition"
                [class.text-amber-500]="job.is_saved"
                title="Bookmark Job"
              >
                <lucide-icon name="bookmark" [size]="18" [class.fill-current]="job.is_saved"></lucide-icon>
              </button>
            </div>

            <!-- Tags Row (Match Score, Work Type, Experience) -->
            <div class="flex flex-wrap items-center gap-2">
              <span 
                class="px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"
                [ngClass]="job.match_score >= 90 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'"
              >
                <lucide-icon name="sparkles" [size]="11"></lucide-icon>
                <span>{{ job.match_score }}% Match</span>
              </span>

              <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {{ job.work_type }}
              </span>

              <span *ngIf="job.experience_level" class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
                {{ job.experience_level }}
              </span>
            </div>

            <!-- Short Job Description -->
            <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {{ job.description }}
            </p>

            <!-- Skill Tags (Clickable to filter!) -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              <button 
                *ngFor="let s of getSkillArray(job.skills)"
                (click)="$event.stopPropagation(); setSkillFilter(s)"
                class="px-2 py-0.5 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 hover:border-violet-500 hover:text-violet-600 transition"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <!-- Bottom Card Footer (Salary & Track Action) -->
          <div class="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <span class="text-xs font-mono font-bold text-gray-900 dark:text-white">
                {{ formatSalary(job.salary_min, job.salary_max) }}
              </span>
              <p class="text-[10px] text-gray-400">Estimated compensation</p>
            </div>

            <div class="flex items-center gap-2">
              <button 
                *ngIf="!isJobTracked(job)"
                (click)="$event.stopPropagation(); trackJob(job)"
                class="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium flex items-center gap-1.5 transition shadow-xs active:scale-95"
              >
                <lucide-icon name="plus" [size]="14"></lucide-icon>
                <span>Track Application</span>
              </button>

              <button 
                *ngIf="isJobTracked(job)"
                (click)="$event.stopPropagation()"
                class="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800"
              >
                <lucide-icon name="check-circle-2" [size]="14"></lucide-icon>
                <span>In Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Filter State -->
      <ng-template #noJobsFound>
        <div class="p-12 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3 shadow-soft">
          <div class="w-14 h-14 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 flex items-center justify-center mx-auto">
            <lucide-icon name="search" [size]="28"></lucide-icon>
          </div>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">No Matching Roles Found</h3>
          <p class="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search keywords, clear filter tags, or add your custom job opportunity.
          </p>
          <div class="pt-2 flex justify-center gap-3">
            <button 
              (click)="resetFilters()"
              class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium transition"
            >
              Reset Filters
            </button>
            <button 
              (click)="showAddJobModal = true"
              class="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium transition"
            >
              + Add Custom Job
            </button>
          </div>
        </div>
      </ng-template>

      <!-- Job Detail Slide-Over Modal -->
      <div 
        *ngIf="selectedJob" 
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-150"
        (click)="selectedJob = null"
      >
        <div 
          (click)="$event.stopPropagation()"
          class="w-full max-w-xl bg-white dark:bg-gray-900 h-full p-6 overflow-y-auto shadow-2xl border-l border-gray-200 dark:border-gray-800 space-y-6 flex flex-col justify-between"
        >
          <div class="space-y-6">
            <!-- Modal Header -->
            <div class="flex items-start justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center text-base">
                  {{ selectedJob.company_name.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedJob.title }}</h3>
                  <p class="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>{{ selectedJob.company_name }}</span>
                    <span>•</span>
                    <span>{{ selectedJob.location }} ({{ selectedJob.work_type }})</span>
                  </p>
                </div>
              </div>
              <button (click)="selectedJob = null" class="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <lucide-icon name="x" [size]="20"></lucide-icon>
              </button>
            </div>

            <!-- Key Quick Info Pill Bar -->
            <div class="grid grid-cols-3 gap-3">
              <div class="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60">
                <span class="text-[10px] uppercase font-semibold text-gray-400">Match Rating</span>
                <div class="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {{ selectedJob.match_score }}% Match
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60">
                <span class="text-[10px] uppercase font-semibold text-gray-400">Compensation</span>
                <div class="text-base font-mono font-bold text-gray-900 dark:text-white mt-0.5">
                  {{ formatSalary(selectedJob.salary_min, selectedJob.salary_max) }}
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60">
                <span class="text-[10px] uppercase font-semibold text-gray-400">Work Setup</span>
                <div class="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                  {{ selectedJob.work_type }}
                </div>
              </div>
            </div>

            <!-- AI Match Breakdown Card -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40 border border-violet-200 dark:border-violet-800 space-y-2">
              <div class="flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-xs">
                <lucide-icon name="sparkles" [size]="15"></lucide-icon>
                <span>AI Profile Fit Analysis</span>
              </div>
              <ul class="text-xs text-gray-700 dark:text-gray-300 space-y-1.5 pl-1">
                <li *ngFor="let point of (selectedJob.why_you_match || defaultWhyYouMatch)" class="flex items-start gap-2">
                  <lucide-icon name="check-circle-2" [size]="14" class="text-emerald-500 shrink-0 mt-0.5"></lucide-icon>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <!-- Full Description -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400">Role Overview</h4>
              <p class="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                {{ selectedJob.description }}
              </p>
            </div>

            <!-- Key Responsibilities -->
            <div *ngIf="selectedJob.responsibilities" class="space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400">Key Responsibilities</h4>
              <ul class="text-xs leading-relaxed text-gray-700 dark:text-gray-300 space-y-1.5">
                <li *ngFor="let r of selectedJob.responsibilities" class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5"></span>
                  <span>{{ r }}</span>
                </li>
              </ul>
            </div>

            <!-- Tech Stack & Skills -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400">Required Skills & Technologies</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  *ngFor="let s of getSkillArray(selectedJob.skills)"
                  class="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-800 dark:text-gray-200"
                >
                  {{ s }}
                </span>
              </div>
            </div>
          </div>

          <!-- Drawer Action Bottom Footer -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3">
            <button 
              (click)="toggleSaveJob(selectedJob)"
              class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium flex items-center gap-2 transition"
            >
              <lucide-icon name="bookmark" [size]="15" [class.fill-current]="selectedJob.is_saved"></lucide-icon>
              <span>{{ selectedJob.is_saved ? 'Saved' : 'Save Job' }}</span>
            </button>

            <div class="flex items-center gap-2">
              <a 
                *ngIf="selectedJob.job_url"
                [href]="selectedJob.job_url" 
                target="_blank"
                class="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition"
              >
                <span>Company Posting</span>
                <lucide-icon name="arrow-up-right" [size]="14"></lucide-icon>
              </a>

              <button 
                *ngIf="!isJobTracked(selectedJob)"
                (click)="trackJob(selectedJob)"
                class="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs flex items-center gap-2 shadow-md shadow-violet-500/20 transition active:scale-95"
              >
                <lucide-icon name="plus" [size]="15"></lucide-icon>
                <span>Track Application</span>
              </button>

              <span 
                *ngIf="isJobTracked(selectedJob)"
                class="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-800"
              >
                <lucide-icon name="check-circle-2" [size]="15"></lucide-icon>
                <span>Added to Pipeline</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Custom Job Opportunity Modal -->
      <div 
        *ngIf="showAddJobModal" 
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-150"
        (click)="showAddJobModal = false"
      >
        <div 
          (click)="$event.stopPropagation()"
          class="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4"
        >
          <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">Add Job Opportunity</h3>
              <p class="text-xs text-gray-500">Save a discovered job opening into your discovery board.</p>
            </div>
            <button (click)="showAddJobModal = false" class="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <lucide-icon name="x" [size]="20"></lucide-icon>
            </button>
          </div>

          <form (ngSubmit)="submitCustomJob()" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Position Title *</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.title" 
                  name="title" 
                  required 
                  placeholder="e.g. Senior Full Stack Engineer" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.company_name" 
                  name="company_name" 
                  required 
                  placeholder="e.g. OpenAI" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Work Type</label>
                <select 
                  [(ngModel)]="newJob.work_type" 
                  name="work_type"
                  class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                <input 
                  type="text" 
                  [(ngModel)]="newJob.location" 
                  name="location" 
                  placeholder="San Francisco, CA / Remote" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Experience</label>
                <select 
                  [(ngModel)]="newJob.experience_level" 
                  name="experience_level"
                  class="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Staff">Staff / Lead</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Min Salary ($)</label>
                <input 
                  type="number" 
                  [(ngModel)]="newJob.salary_min" 
                  name="salary_min" 
                  placeholder="150000" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Max Salary ($)</label>
                <input 
                  type="number" 
                  [(ngModel)]="newJob.salary_max" 
                  name="salary_max" 
                  placeholder="200000" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Skills (comma-separated)</label>
              <input 
                type="text" 
                [(ngModel)]="newJob.skills" 
                name="skills" 
                placeholder="Angular, TypeScript, Python, FastAPI, Docker" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Job URL (optional)</label>
              <input 
                type="url" 
                [(ngModel)]="newJob.job_url" 
                name="job_url" 
                placeholder="https://company.com/careers/role" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description & Overview</label>
              <textarea 
                [(ngModel)]="newJob.description" 
                name="description" 
                rows="3" 
                placeholder="Summary of the role, team, and projects..." 
                class="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>
            </div>

            <div class="pt-3 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800">
              <button 
                type="button" 
                (click)="showAddJobModal = false" 
                class="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm shadow-md shadow-violet-500/20"
              >
                Save Opportunity
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- AI Match Customizer Modal -->
      <div 
        *ngIf="showAiModal" 
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-150"
        (click)="showAiModal = false"
      >
        <div 
          (click)="$event.stopPropagation()"
          class="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4"
        >
          <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-2">
              <lucide-icon name="sparkles" [size]="18" class="text-violet-600"></lucide-icon>
              <h3 class="text-base font-bold text-gray-900 dark:text-white">AI Profile Matching Engine</h3>
            </div>
            <button (click)="showAiModal = false" class="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <lucide-icon name="x" [size]="18"></lucide-icon>
            </button>
          </div>

          <p class="text-xs text-gray-500 leading-relaxed">
            Customize your primary target skills and role preferences. Our AI matching model will dynamically recalculate match percentages across all roles.
          </p>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Target Primary Skillset</label>
              <input 
                type="text" 
                [(ngModel)]="userSkillsInput" 
                placeholder="Angular, TypeScript, Python, FastAPI, Docker, Tailwind" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Desired Role Focus</label>
              <select 
                [(ngModel)]="targetRoleFocus" 
                class="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Full Stack">Full Stack Engineering</option>
                <option value="Frontend">Frontend / UI Architecture</option>
                <option value="Backend">Backend / Distributed Systems</option>
                <option value="AI / ML">AI & Machine Learning Engineering</option>
                <option value="DevOps">Cloud & DevOps / SRE</option>
              </select>
            </div>
          </div>

          <div class="pt-3 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800">
            <button 
              type="button" 
              (click)="showAiModal = false" 
              class="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button 
              type="button" 
              (click)="recalculateAiMatches()" 
              class="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs shadow-md shadow-violet-500/20 flex items-center gap-1.5"
            >
              <lucide-icon name="sparkles" [size]="14"></lucide-icon>
              <span>Recalculate Matches</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class JobsComponent {
  appService = inject(ApplicationService);

  searchQuery = '';
  selectedWorkType = 'All';
  selectedExperience = 'All';
  activeTab = 'all';
  activeSkillFilter: string | null = null;
  toastMessage: string | null = null;

  showAddJobModal = false;
  showAiModal = false;
  selectedJob: DiscoveryJob | null = null;

  userSkillsInput = 'Angular, TypeScript, Python, FastAPI, PostgreSQL, Docker, Tailwind CSS';
  targetRoleFocus = 'Full Stack';

  filterTabs = [
    { id: 'all', label: 'All Openings' },
    { id: 'high-match', label: 'Top AI Matches (90%+)' },
    { id: 'remote', label: 'Remote Only' },
    { id: 'saved', label: 'Saved Jobs' },
    { id: 'tracked', label: 'Tracked Pipeline' }
  ];

  defaultWhyYouMatch = [
    'Strong alignment with Angular & TypeScript modern enterprise stack',
    'Demonstrated experience with async Python FastAPI REST backend APIs',
    'Experience designing responsive component design systems'
  ];

  newJob: Partial<DiscoveryJob> = {
    title: '',
    company_name: '',
    work_type: 'Remote',
    location: 'Remote',
    experience_level: 'Senior',
    salary_min: 150000,
    salary_max: 200000,
    skills: 'TypeScript, Angular, Python, FastAPI',
    description: '',
    job_url: ''
  };

  // Curated high-caliber market feed of active tech opportunities
  curatedMarketJobs: DiscoveryJob[] = [
    {
      id: 'disc-1',
      title: 'Senior Full Stack Engineer',
      company_name: 'Stripe',
      location: 'San Francisco, CA / Remote',
      work_type: 'Remote',
      salary_min: 175000,
      salary_max: 230000,
      currency: 'USD',
      experience_level: 'Senior',
      job_url: 'https://stripe.com/jobs',
      match_score: 96,
      is_saved: false,
      skills: 'Angular, TypeScript, Python, REST APIs, PostgreSQL, Docker',
      description: 'Build mission-critical billing infrastructure and delightful developer interfaces powering global internet commerce with millions of transactions.',
      responsibilities: [
        'Design and ship scalable front-end workflows using modern TypeScript and reactive patterns',
        'Build robust, high-throughput asynchronous backend microservices',
        'Collaborate closely with product and infrastructure teams on reliability and developer ergonomics'
      ],
      why_you_match: [
        '96% Match: Your TypeScript & Angular experience directly maps to their core web console needs',
        'Strong backend API integration skills matches their distributed billing systems',
        'High salary potential aligning with your compensation expectations'
      ]
    },
    {
      id: 'disc-2',
      title: 'AI Platform & Frontend Engineer',
      company_name: 'Anthropic',
      location: 'San Francisco, CA',
      work_type: 'Hybrid',
      salary_min: 190000,
      salary_max: 260000,
      currency: 'USD',
      experience_level: 'Senior',
      job_url: 'https://anthropic.com/careers',
      match_score: 94,
      is_saved: true,
      skills: 'TypeScript, Python, LLMs, Vector DBs, React, Angular, FastAPI',
      description: 'Create the next generation of safe, steerable AI interfaces and developer tooling supporting frontier model research and conversational workspaces.',
      responsibilities: [
        'Develop real-time streaming interfaces for large language models and multi-modal assistants',
        'Architect responsive web components with focus on latency and state synchronization',
        'Partner with research scientists to prototype novel human-AI interaction modalities'
      ],
      why_you_match: [
        '94% Match: Hands-on Gemini/LLM AI integration background in your recent projects',
        'Proven expertise building clean reactive dashboards with Tailwind and TypeScript',
        'Direct experience handling real-time asynchronous streaming updates'
      ]
    },
    {
      id: 'disc-3',
      title: 'Frontend Systems Architect',
      company_name: 'Vercel',
      location: 'Remote',
      work_type: 'Remote',
      salary_min: 180000,
      salary_max: 240000,
      currency: 'USD',
      experience_level: 'Staff',
      job_url: 'https://vercel.com/careers',
      match_score: 91,
      is_saved: false,
      skills: 'TypeScript, Web Performance, Tailwind CSS, Edge Functions, CI/CD',
      description: 'Lead the frontend engineering standards, web performance optimization, and developer experience across the Vercel cloud platform and dashboard.',
      responsibilities: [
        'Optimize Core Web Vitals and component bundle sizes across global edge infrastructure',
        'Standardize design system tokens, accessibility, and automated E2E test suites',
        'Mentor engineering teams on modern browser APIs and reactive frontend paradigms'
      ],
      why_you_match: [
        '91% Match: Strong mastery of Tailwind CSS and modern reactive component architectures',
        'Deep understanding of frontend build tooling, bundling, and client state optimization'
      ]
    },
    {
      id: 'disc-4',
      title: 'Backend Systems & API Engineer',
      company_name: 'Datadog',
      location: 'New York, NY / Remote',
      work_type: 'Remote',
      salary_min: 165000,
      salary_max: 215000,
      currency: 'USD',
      experience_level: 'Mid',
      job_url: 'https://datadoghq.com/careers',
      match_score: 89,
      is_saved: false,
      skills: 'Python, FastAPI, PostgreSQL, Redis, Kubernetes, Distributed Systems',
      description: 'Architect and scale cloud monitoring pipelines ingesting trillions of metrics daily with sub-second query latency and zero-downtime reliability.',
      responsibilities: [
        'Build high-performance asynchronous API endpoints in Python with asyncpg and SQLAlchemy',
        'Optimize complex database queries and indexing strategies for massive throughput',
        'Implement resilient distributed telemetry collectors and health check systems'
      ],
      why_you_match: [
        '89% Match: Your async Python/FastAPI/PostgreSQL stack is an exact match for their backend requirements',
        'Experience building robust RESTful authentication and RBAC workflows'
      ]
    },
    {
      id: 'disc-5',
      title: 'Product Engineer - Core Workflows',
      company_name: 'Linear',
      location: 'Remote',
      work_type: 'Remote',
      salary_min: 170000,
      salary_max: 225000,
      currency: 'USD',
      experience_level: 'Senior',
      job_url: 'https://linear.app/careers',
      match_score: 95,
      is_saved: true,
      skills: 'TypeScript, Keyboard Shortcuts, Drag and Drop, Real-time Sync, Tailwind',
      description: 'Obsess over user experience, sub-50ms interaction speeds, and keyboard-first developer workflows in the world’s favorite issue tracker.',
      responsibilities: [
        'Build fluid drag-and-drop Kanban boards, rich keyboard navigation, and instant local mutations',
        'Implement optimistic client-side caching with background server synchronization',
        'Craft delightful micro-interactions, subtle sound effects, and dark mode interfaces'
      ],
      why_you_match: [
        '95% Match: You just implemented drag-and-drop Kanban and keyboard shortcut navigation',
        'Obsession with clean modern SaaS typography, dark mode, and optimistic UI updates'
      ]
    },
    {
      id: 'disc-6',
      title: 'Cloud Infrastructure & DevOps Engineer',
      company_name: 'HashiCorp',
      location: 'Austin, TX / Remote',
      work_type: 'Remote',
      salary_min: 160000,
      salary_max: 210000,
      currency: 'USD',
      experience_level: 'Senior',
      job_url: 'https://hashicorp.com/jobs',
      match_score: 87,
      is_saved: false,
      skills: 'Terraform, Docker, Kubernetes, Python, AWS, GitHub Actions',
      description: 'Automate multi-cloud infrastructure provisioning, container security, and zero-trust networking systems powering Fortune 500 enterprises.',
      responsibilities: [
        'Develop infrastructure as code modules and automated CI/CD deployment pipelines',
        'Manage Kubernetes cluster scaling, monitoring, and secrets management',
        'Collaborate with product teams to ensure high availability and disaster recovery'
      ],
      why_you_match: [
        '87% Match: Strong foundational Docker and containerization background',
        'Hands-on experience automating testing and multi-service deployments'
      ]
    }
  ];

  // Combined list of backend user jobs + curated discovery jobs
  get allJobs(): DiscoveryJob[] {
    const backendJobs: DiscoveryJob[] = this.appService.jobs().map(j => ({
      ...j,
      is_tracked: this.isJobTracked(j)
    }));

    // Merge: backend jobs first, then curated jobs not already duplicated by title/company
    const existingKeys = new Set(backendJobs.map(b => `${b.title.toLowerCase()}_${b.company_name.toLowerCase()}`));
    const filteredCurated = this.curatedMarketJobs.filter(
      c => !existingKeys.has(`${c.title.toLowerCase()}_${c.company_name.toLowerCase()}`)
    );

    return [...backendJobs, ...filteredCurated];
  }

  // Filtered jobs according to search, dropdowns, and tabs
  get filteredJobs(): DiscoveryJob[] {
    return this.allJobs.filter(job => {
      // 1. Search Query filter (matches title, company, skills, or location)
      const q = this.searchQuery.trim().toLowerCase();
      const matchQuery = !q || 
        job.title.toLowerCase().includes(q) || 
        job.company_name.toLowerCase().includes(q) ||
        (job.skills && job.skills.toLowerCase().includes(q)) ||
        (job.location && job.location.toLowerCase().includes(q));

      // 2. Work Type filter
      const matchWorkType = this.selectedWorkType === 'All' || job.work_type === this.selectedWorkType;

      // 3. Experience filter
      const matchExp = this.selectedExperience === 'All' || 
        (job.experience_level && job.experience_level.toLowerCase().includes(this.selectedExperience.toLowerCase()));

      // 4. Clicked Skill chip filter
      const matchSkill = !this.activeSkillFilter || 
        (job.skills && job.skills.toLowerCase().includes(this.activeSkillFilter.toLowerCase()));

      // 5. Tab filter
      let matchTab = true;
      if (this.activeTab === 'high-match') {
        matchTab = job.match_score >= 90;
      } else if (this.activeTab === 'remote') {
        matchTab = job.work_type === 'Remote';
      } else if (this.activeTab === 'saved') {
        matchTab = !!job.is_saved;
      } else if (this.activeTab === 'tracked') {
        matchTab = this.isJobTracked(job);
      }

      return matchQuery && matchWorkType && matchExp && matchSkill && matchTab;
    });
  }

  getTabCount(tabId: string): number {
    switch (tabId) {
      case 'all': return this.allJobs.length;
      case 'high-match': return this.allJobs.filter(j => j.match_score >= 90).length;
      case 'remote': return this.allJobs.filter(j => j.work_type === 'Remote').length;
      case 'saved': return this.allJobs.filter(j => j.is_saved).length;
      case 'tracked': return this.allJobs.filter(j => this.isJobTracked(j)).length;
      default: return 0;
    }
  }

  isJobTracked(job: DiscoveryJob): boolean {
    const existing = this.appService.applications();
    return existing.some(
      a => a.position.toLowerCase() === job.title.toLowerCase() && 
           a.company_name.toLowerCase() === job.company_name.toLowerCase()
    );
  }

  trackJob(job: DiscoveryJob) {
    this.appService.addApplication({
      position: job.title,
      company_name: job.company_name,
      status: 'Applied',
      priority: 'High',
      work_type: job.work_type,
      location: job.location,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      source: 'Job Discovery',
      notes: `Discovered from JobFlow AI Match (${job.match_score}% match). ${job.description ? job.description.slice(0, 150) + '...' : ''}`
    });

    job.is_tracked = true;
    this.showToast(`Tracked "${job.title}" at ${job.company_name} to your applications!`);
  }

  toggleSaveJob(job: DiscoveryJob) {
    job.is_saved = !job.is_saved;
    const msg = job.is_saved ? `Saved "${job.title}" to bookmarks` : `Removed "${job.title}" from bookmarks`;
    this.showToast(msg);
  }

  openJobDetail(job: DiscoveryJob) {
    this.selectedJob = job;
  }

  setSkillFilter(skill: string) {
    this.activeSkillFilter = skill.trim();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedWorkType = 'All';
    this.selectedExperience = 'All';
    this.activeTab = 'all';
    this.activeSkillFilter = null;
  }

  submitCustomJob() {
    if (!this.newJob.title || !this.newJob.company_name) return;

    const created: DiscoveryJob = {
      id: 'custom-' + Date.now(),
      title: this.newJob.title,
      company_name: this.newJob.company_name,
      work_type: this.newJob.work_type as any || 'Remote',
      location: this.newJob.location || 'Remote',
      experience_level: this.newJob.experience_level || 'Senior',
      salary_min: this.newJob.salary_min || 140000,
      salary_max: this.newJob.salary_max || 190000,
      currency: 'USD',
      skills: this.newJob.skills || 'TypeScript, Full Stack',
      description: this.newJob.description || 'Custom added job opportunity.',
      job_url: this.newJob.job_url || '',
      match_score: 92,
      is_saved: true,
      why_you_match: [
        'Custom curated role added directly by you',
        'Matches your target career aspirations'
      ]
    };

    this.curatedMarketJobs.unshift(created);
    this.showAddJobModal = false;
    this.showToast(`Added "${created.title}" at ${created.company_name} to Job Discovery!`);

    // Reset form
    this.newJob = {
      title: '',
      company_name: '',
      work_type: 'Remote',
      location: 'Remote',
      experience_level: 'Senior',
      salary_min: 150000,
      salary_max: 200000,
      skills: 'TypeScript, Angular, Python, FastAPI',
      description: '',
      job_url: ''
    };
  }

  recalculateAiMatches() {
    const inputTerms = this.userSkillsInput.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    
    // Dynamically adjust match score based on user skills
    this.curatedMarketJobs.forEach(job => {
      if (!job.skills) return;
      const jobSkills = job.skills.toLowerCase().split(',').map(s => s.trim());
      const common = inputTerms.filter(term => jobSkills.some(js => js.includes(term) || term.includes(js))).length;
      
      const score = Math.min(99, Math.max(78, 80 + common * 4));
      job.match_score = score;
    });

    this.showAiModal = false;
    this.showToast(`AI Matching Engine recalculated scores across ${this.curatedMarketJobs.length} opportunities!`);
  }

  getSkillArray(skills?: string): string[] {
    if (!skills) return [];
    return skills.split(',').map(s => s.trim()).filter(Boolean);
  }

  formatSalary(min?: number, max?: number): string {
    if (!min && !max) return 'Salary Undisclosed';
    const minK = min ? `$${Math.round(min / 1000)}k` : '';
    const maxK = max ? `$${Math.round(max / 1000)}k` : '';
    if (minK && maxK) return `${minK} - ${maxK} / yr`;
    return `${minK || maxK} / yr`;
  }

  private showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => {
      if (this.toastMessage === msg) {
        this.toastMessage = null;
      }
    }, 4000);
  }
}
