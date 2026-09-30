import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/models';

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API = 'http://localhost:8000/api/v1';
  private readonly TOKEN_KEY = 'jobflow_access_token';
  private readonly REFRESH_KEY = 'jobflow_refresh_token';
  private readonly USER_KEY = 'jobflow_user';

  currentUser = signal<User | null>(this.loadUserFromStorage());
  isAuthenticated = computed(() => !!this.currentUser() && !!this.getToken());
  user = computed(() => this.currentUser());

  private loadUserFromStorage(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (stored && token) return JSON.parse(stored);
    } catch {}
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  async login(credentials: { email: string; password: string }): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API}/auth/login`, credentials)
      );
      this.setSession(res);
      return { success: true };
    } catch (err: any) {
      const msg = err?.error?.detail || 'Invalid email or password. Please try again.';
      return { success: false, error: msg };
    }
  }

  async register(credentials: { email: string; password: string; full_name: string }): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API}/auth/register`, credentials)
      );
      this.setSession(res);
      return { success: true };
    } catch (err: any) {
      const msg = err?.error?.detail || 'Registration failed. Please try again.';
      return { success: false, error: msg };
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem(this.REFRESH_KEY);
    if (!refreshToken) return false;
    try {
      const res = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API}/auth/refresh`, { refresh_token: refreshToken })
      );
      this.setSession(res);
      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  async loadCurrentUser(): Promise<void> {
    try {
      const user = await firstValueFrom(
        this.http.get<User>(`${this.API}/auth/me`, { headers: this.getAuthHeaders() })
      );
      this.currentUser.set(user);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch {
      this.logout();
    }
  }

  private setSession(res: LoginResponse) {
    localStorage.setItem(this.TOKEN_KEY, res.access_token);
    if (res.refresh_token) localStorage.setItem(this.REFRESH_KEY, res.refresh_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
