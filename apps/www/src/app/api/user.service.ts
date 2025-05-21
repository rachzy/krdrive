import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/post';
import { API_URL } from '../consts/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  public getUser(username: string): Observable<User> {
    return this._httpClient.get<User>(
      `${API_URL}/account/get-user/${username}`
    );
  }
}
