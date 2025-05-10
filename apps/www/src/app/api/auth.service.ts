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
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  public login(username: string, password: string): Observable<LoginResponse> {
    return this._httpClient
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
}
