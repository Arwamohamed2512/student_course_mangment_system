import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number | null;
}

export interface PublicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: PublicUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';
  private tokenKey = 'token';
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password });
  }

  setAuth(token: string, user: PublicUser): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): PublicUser | null {
    const user = localStorage.getItem(this.userKey);

    return user ? JSON.parse(user) : null;
  }

  getUserId(): string | null {
    const user = this.getUser();

    return user?.id || null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}