import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule, FileText, Upload, Plus, Download, Star, Trash2, Check,
  X, AlertCircle, File, CheckCircle2, ExternalLink
} from 'lucide-angular';

export interface DocumentItem {
  id: string;
  name: string;
  version: string;
  is_default: boolean;
  size: string;
  type: string;
  updated: string;
  url?: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-200">
      <!-- Hidden Native File Input -->
      <input
        #fileInput
        type="file"
        accept=".pdf,.doc,.docx"
        class="hidden"
        (change)="onFileSelected($event)"
      />

      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Document Vault & Resumes</h1>
          <p class="text-sm text-gray-500 mt-0.5">Manage resume versions, cover letter templates, and portfolios.</p>
        </div>

        <div class="flex items-center gap-3">
          <button
            (click)="triggerFileInput()"
            class="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm flex items-center gap-2 shadow-md shadow-violet-500/20 transition active:scale-95 cursor-pointer">
            <lucide-icon name="upload" [size]="16"></lucide-icon>
            <span>Upload Resume</span>
          </button>
        </div>
      </div>

      <!-- Success Notification Alert -->
      <div *ngIf="notification()" class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm flex items-center justify-between animate-in fade-in">
        <div class="flex items-center gap-2.5">
          <lucide-icon name="check-circle-2" [size]="18" class="text-emerald-500"></lucide-icon>
          <span>{{ notification() }}</span>
        </div>
        <button (click)="notification.set('')" class="text-emerald-500 hover:text-emerald-700">
          <lucide-icon name="x" [size]="16"></lucide-icon>
        </button>
      </div>

      <!-- Drag & Drop Upload Zone Card -->
      <div
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        [ngClass]="{
          'border-violet-500 bg-violet-50/50 dark:bg-violet-950/30 scale-[1.01]': isDragging(),
          'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900': !isDragging()
        }"
        class="p-8 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center cursor-pointer group shadow-soft"
        (click)="triggerFileInput()">
        
        <div class="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <lucide-icon name="upload" [size]="24"></lucide-icon>
        </div>
        <h3 class="font-bold text-base text-gray-900 dark:text-white">Click or drag & drop to upload your resume</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">Supports PDF, DOC, DOCX files up to 10MB. Custom tailored resume versions for your target roles.</p>
        <span class="mt-4 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:bg-violet-600 group-hover:text-white transition-colors">
          Select Document File
        </span>
      </div>

      <!-- Document List Grid -->
      <div *ngIf="documents().length > 0; else emptyState" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let doc of documents()"
          class="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-soft space-y-4 flex flex-col justify-between transition-all hover:border-violet-500/40 hover:shadow-lg">
          
          <div>
            <!-- Top Metadata -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <lucide-icon name="file-text" [size]="20"></lucide-icon>
                </div>
                <div class="min-w-0">
                  <h3 class="font-bold text-sm text-gray-900 dark:text-white truncate" [title]="doc.name">
                    {{ doc.name }}
                  </h3>
                  <div class="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                    <span>v{{ doc.version }}</span>
                    <span>•</span>
                    <span>{{ doc.size }}</span>
                  </div>
                </div>
              </div>

              <!-- Default Badge -->
              <span *ngIf="doc.is_default" class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 shrink-0 flex items-center gap-1">
                <lucide-icon name="star" [size]="10" class="fill-amber-400 text-amber-400"></lucide-icon>
                Default
              </span>
            </div>

            <p class="text-xs text-gray-500 dark:text-gray-400">
              Updated: <span class="font-medium text-gray-700 dark:text-gray-300">{{ doc.updated }}</span>
            </p>
          </div>

          <!-- Actions Footer -->
          <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
            <button
              *ngIf="!doc.is_default"
              (click)="setDefault(doc.id)"
              class="px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-1">
              <lucide-icon name="star" [size]="12"></lucide-icon>
              Set Default
            </button>
            <span *ngIf="doc.is_default" class="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <lucide-icon name="check" [size]="12"></lucide-icon> Active Primary
            </span>

            <div class="flex items-center gap-1">
              <button
                (click)="downloadDoc(doc)"
                class="p-2 rounded-lg text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition"
                title="Download document">
                <lucide-icon name="download" [size]="16"></lucide-icon>
              </button>
              <button
                (click)="deleteDoc(doc.id)"
                class="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
                title="Delete document">
                <lucide-icon name="trash-2" [size]="16"></lucide-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <ng-template #emptyState>
        <div class="p-12 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3">
          <div class="w-16 h-16 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 flex items-center justify-center mx-auto">
            <lucide-icon name="file-text" [size]="32"></lucide-icon>
          </div>
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">No Resumes Uploaded Yet</h3>
          <p class="text-xs text-gray-500 max-w-sm mx-auto">Upload your master resume or tailored version to auto-match jobs and prepare applications.</p>
          <button (click)="triggerFileInput()" class="px-4 py-2.5 rounded-xl bg-violet-600 text-white font-medium text-xs">
            Upload First Resume
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class DocumentsComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  isDragging = signal(false);
  notification = signal('');

  documents = signal<DocumentItem[]>([
    {
      id: 'doc-1',
      name: 'Fullstack_Architect_Rahul_2026.pdf',
      version: '3.2',
      is_default: true,
      size: '2.4 MB',
      type: 'pdf',
      updated: 'Sep 18, 2026'
    },
    {
      id: 'doc-2',
      name: 'Frontend_Specialist_Vercel_Tailored.pdf',
      version: '2.1',
      is_default: false,
      size: '1.8 MB',
      type: 'pdf',
      updated: 'Sep 12, 2026'
    },
    {
      id: 'doc-3',
      name: 'Systems_Backend_Python_FastAPI.pdf',
      version: '1.4',
      is_default: false,
      size: '1.5 MB',
      type: 'pdf',
      updated: 'Sep 05, 2026'
    }
  ]);

  triggerFileInput() {
    this.fileInputRef?.nativeElement?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.processUploadedFile(file);
      input.value = ''; // Reset input so same file can be selected again
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processUploadedFile(file);
    }
  }

  private processUploadedFile(file: File) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newDoc: DocumentItem = {
      id: 'doc-' + Date.now(),
      name: file.name,
      version: '1.0',
      is_default: this.documents().length === 0,
      size: sizeInMB,
      type: file.name.split('.').pop()?.toLowerCase() || 'pdf',
      updated: today
    };

    this.documents.update(current => [newDoc, ...current]);
    this.notification.set(`Successfully uploaded "${file.name}" to your Document Vault!`);
    setTimeout(() => this.notification.set(''), 5000);
  }

  setDefault(id: string) {
    this.documents.update(current =>
      current.map(d => ({ ...d, is_default: d.id === id }))
    );
    this.notification.set('Default primary resume updated.');
    setTimeout(() => this.notification.set(''), 3000);
  }

  deleteDoc(id: string) {
    this.documents.update(current => current.filter(d => d.id !== id));
    this.notification.set('Document removed from vault.');
    setTimeout(() => this.notification.set(''), 3000);
  }

  downloadDoc(doc: DocumentItem) {
    // Generate dummy blob download for file
    const content = `Resume Document: ${doc.name}\nVersion: ${doc.version}\nUploaded: ${doc.updated}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    a.click();
    URL.revokeObjectURL(url);
    this.notification.set(`Downloading "${doc.name}"...`);
    setTimeout(() => this.notification.set(''), 3000);
  }
}
