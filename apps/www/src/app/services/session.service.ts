import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
export class SessionService {
  private readonly _jwtHelper = new JwtHelperService();
  private readonly _router = inject(Router);

  public logout(): void {
    localStorage.removeItem('access_token');
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      return !this._jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  public verifyToken(): void {
    if (!this.isTokenValid()) {
      this.logout();
      this._router.navigate(['/login']);
    }
  }
}
