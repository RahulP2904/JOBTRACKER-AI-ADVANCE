import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import {
  LucideAngularModule, BarChart3, PieChart, TrendingUp, DollarSign,
  Award, Briefcase, UserCheck, Target, Percent, Plus
} from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxEchartsModule, LucideAngularModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') })
    }
  ],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            Career Analytics
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Data-driven performance metrics, conversion funnel, and compensation insights.</p>
        </div>
      </div>

      <!-- KPI Summary Stat Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Tracked</span>
            <div class="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <lucide-icon name="briefcase" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-gray-900 dark:text-white">{{ metrics.total_applications }}</div>
          <p class="text-xs text-gray-500 mt-1">Applications in pipeline</p>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Response Rate</span>
            <div class="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <lucide-icon name="percent" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-blue-600 dark:text-blue-400">{{ metrics.response_rate }}%</div>
          <p class="text-xs text-gray-500 mt-1">Sourcing response conversion</p>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Interviews</span>
            <div class="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <lucide-icon name="user-check" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-amber-600 dark:text-amber-400">{{ metrics.interviews_count }}</div>
          <p class="text-xs text-gray-500 mt-1">Technical & Final rounds</p>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Job Offers</span>
            <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <lucide-icon name="award" [size]="18"></lucide-icon>
            </div>
          </div>
          <div class="text-3xl font-black text-emerald-600 dark:text-emerald-400">{{ metrics.offers_count }}</div>
          <p class="text-xs text-gray-500 mt-1">Offers extended</p>
        </div>
      </div>

      <!-- Main Charts Grid -->
      <div *ngIf="hasApplications(); else emptyAnalyticsState" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Funnel Conversion Chart -->
        <div class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-base text-gray-900 dark:text-white">Application Stage Conversion Funnel</h3>
              <p class="text-xs text-gray-500 mt-0.5">Progression from Applied to Offer</p>
            </div>
          </div>
          <div echarts [options]="funnelOption()" class="h-72"></div>
        </div>

        <!-- Job Sourcing Channel Donut Chart -->
        <div class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-base text-gray-900 dark:text-white">Applications by Channel Source</h3>
              <p class="text-xs text-gray-500 mt-0.5">Distribution of applications by acquisition source</p>
            </div>
          </div>
          <div echarts [options]="sourceOption()" class="h-72"></div>
        </div>
      </div>

      <!-- Empty Analytics State -->
      <ng-template #emptyAnalyticsState>
        <div class="p-12 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3 shadow-soft">
          <div class="w-16 h-16 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 flex items-center justify-center mx-auto">
            <lucide-icon name="bar-chart-3" [size]="32"></lucide-icon>
          </div>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">No Application Analytics Yet</h3>
          <p class="text-xs text-gray-500 max-w-sm mx-auto">Add job applications to your workspace to view stage conversion funnel charts and sourcing channel breakdown.</p>
          <a routerLink="/applications" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs transition-all">
            <lucide-icon name="plus" [size]="14"></lucide-icon>
            Add Your First Application
          </a>
        </div>
      </ng-template>
    </div>
  `
})
export class AnalyticsComponent {
  appService = inject(ApplicationService);

  get metrics() {
    return this.appService.metrics();
  }

  hasApplications = computed(() => this.appService.applications().length > 0);

  // Dynamic Funnel Chart Option (strictly using real user data)
  funnelOption = computed(() => {
    const apps = this.appService.applications();
    const applied = apps.filter(a => a.status === 'Applied').length;
    const screening = apps.filter(a => a.status === 'Screening').length;
    const technical = apps.filter(a => a.status === 'Technical Interview').length;
    const finalRound = apps.filter(a => a.status === 'Final Interview').length;
    const offer = apps.filter(a => a.status === 'Offer').length;

    const maxVal = Math.max(applied, screening, technical, finalRound, offer, 1);

    return {
      tooltip: { trigger: 'item', formatter: '{b} : {c} candidates' },
      color: ['#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#10b981'],
      series: [
        {
          name: 'Stage Conversion',
          type: 'funnel',
          left: '10%',
          top: '5%',
          bottom: '5%',
          width: '80%',
          min: 0,
          max: maxVal,
          minSize: '10%',
          maxSize: '100%',
          sort: 'descending',
          gap: 4,
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}: {c}',
            color: '#fff',
            fontWeight: 'bold'
          },
          itemStyle: {
            borderWidth: 0,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.15)'
          },
          data: [
            { value: applied, name: 'Applied' },
            { value: screening, name: 'Screening' },
            { value: technical, name: 'Technical Interview' },
            { value: finalRound, name: 'Final Interview' },
            { value: offer, name: 'Offer' }
          ]
        }
      ]
    };
  });

  // Dynamic Sourcing Channel Donut Chart Option (strictly using real user data)
  sourceOption = computed(() => {
    const apps = this.appService.applications();
    const sourceCounts: Record<string, number> = {};

    apps.forEach(a => {
      const src = a.source || 'Other';
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });

    const data = Object.keys(sourceCounts).map(k => ({ value: sourceCounts[k], name: k }));

    return {
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      legend: { bottom: '0%', left: 'center', textStyle: { color: '#94a3b8' } },
      color: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'],
      series: [
        {
          name: 'Source Channel',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 'bold' }
          },
          data: data.length > 0 ? data : [{ value: 0, name: 'No Applications' }]
        }
      ]
    };
  });
}
