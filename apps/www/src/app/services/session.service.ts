import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { User } from '../types/post';
import { UserService } from '../api/user.service';

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
  private readonly _userService = inject(UserService);

  private readonly _user = new BehaviorSubject<User | null>(null);
  public readonly user$ = this._user.asObservable();

  private async _getUserData(): Promise<void> {
    if (this._user.getValue()) {
      return;
    }

    const userID = localStorage.getItem('user_id');
    if (!userID) {
      return;
    }

    const userData = await firstValueFrom(this._userService.getUser(userID));
    this._user.next(userData);
  }

  public async initialize(): Promise<void> {
    if (!this.isTokenValid()) return;
    await this._getUserData();
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
