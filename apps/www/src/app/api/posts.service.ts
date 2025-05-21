import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../types/post';
import { API_URL } from '../consts/api';

export interface CreatePostRequest {
  content: string;
  files?: File[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private _httpClient: HttpClient) {}

  public createPost(request: CreatePostRequest): Observable<Post> {
    const formData = new FormData();
    formData.append('content', request.content);

    if (request.files?.length) {
      request.files.forEach((file) => {
        formData.append('files', file);
      });
    }

    return this._httpClient.post<Post>(`${API_URL}/posts`, formData);
  }

  public getPosts(): Observable<Post[]> {
    return this._httpClient.get<Post[]>(`${API_URL}/posts`);
  }

  public getPost(id: string): Observable<Post> {
    return this._httpClient.get<Post>(`${API_URL}/posts/${id}`);
  }

  public getUserPosts(userID: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(`${API_URL}/posts/user/${userID}`);
  }
}
