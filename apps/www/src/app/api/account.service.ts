import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../consts/api';

export interface LoginResponse {
  access_token: string;
  user: {
    _id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RegisterRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
