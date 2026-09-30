import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Sparkles, Send, Bot, User } from 'lucide-angular';
import { AIService } from '../../core/services/ai.service';

@Component({
  selector: 'app-ai-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div 
      *ngIf="aiService.isOpen()"
      class="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 flex justify-end"
      (click)="aiService.toggleDrawer()"
    >
      <div 
        (click)="$event.stopPropagation()"
        class="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col animate-in slide-in-from-right duration-200"
      >
        <!-- Header -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center">
              <lucide-icon name="sparkles" [size]="18"></lucide-icon>
            </div>
            <div>
              <h3 class="font-bold text-sm text-gray-900 dark:text-white">Career Copilot</h3>
              <p class="text-[11px] text-gray-500">AI Job Search Assistant</p>
            </div>
          </div>
          <button (click)="aiService.toggleDrawer()" class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <lucide-icon name="x" [size]="18"></lucide-icon>
          </button>
        </div>

        <!-- Chat Stream -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div *ngFor="let msg of aiService.messages()" class="space-y-2">
            <div 
              class="flex gap-3 max-w-[85%]"
              [ngClass]="msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''"
            >
              <div 
                class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-xs"
                [ngClass]="msg.sender === 'user' ? 'bg-violet-600' : 'bg-purple-600'"
              >
                {{ msg.sender === 'user' ? 'U' : 'AI' }}
              </div>

              <div 
                class="p-3.5 rounded-2xl text-xs leading-relaxed"
                [ngClass]="msg.sender === 'user' 
                  ? 'bg-violet-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none border border-gray-200/60 dark:border-gray-700/50'"
              >
                <div [innerText]="msg.text" class="whitespace-pre-wrap"></div>
                <div class="mt-1 text-[10px] opacity-70 text-right">{{ msg.timestamp }}</div>
              </div>
            </div>

            <!-- Suggested Action Chips -->
            <div *ngIf="msg.suggestedActions?.length" class="flex flex-wrap gap-1.5 pl-10">
              <button 
                *ngFor="let action of msg.suggestedActions"
                (click)="aiService.sendMessage(action)"
                class="px-2.5 py-1 rounded-full text-[11px] bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 transition"
              >
                ✨ {{ action }}
              </button>
            </div>
          </div>

          <div *ngIf="aiService.isThinking()" class="flex items-center gap-2 text-xs text-purple-600 pl-10">
            <lucide-icon name="sparkles" [size]="16" class="animate-spin"></lucide-icon>
            <span>Analyzing career data...</span>
          </div>
        </div>

        <!-- Input Footer -->
        <div class="p-3 border-t border-gray-200 dark:border-gray-800">
          <form (ngSubmit)="send()" class="flex items-center gap-2">
            <input 
              type="text" 
              [(ngModel)]="inputText" 
              name="inputText" 
              placeholder="Ask Copilot (e.g. Prepare for Vercel interview...)" 
              class="flex-1 px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit" 
              class="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition active:scale-95"
            >
              <lucide-icon name="send" [size]="16"></lucide-icon>
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AIDrawerComponent {
  aiService = inject(AIService);
  inputText = '';

  send() {
    if (!this.inputText.trim()) return;
    this.aiService.sendMessage(this.inputText);
    this.inputText = '';
  }
}
