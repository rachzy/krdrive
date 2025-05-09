import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../types/post';

export interface CreatePostRequest {
  content: string;
  files?: File[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  createPost(request: CreatePostRequest): Observable<Post> {
    const formData = new FormData();
    formData.append('content', request.content);

    if (request.files?.length) {
      request.files.forEach((file) => {
        formData.append('files', file);
      });
    }

    return this.http.post<Post>(`${this.apiUrl}/posts`, formData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/user/${userId}`);
  }
}
