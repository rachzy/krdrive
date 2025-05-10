import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
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
  constructor(private http: HttpClient) {}

  public createPost(request: CreatePostRequest): Observable<Post> {
    const formData = new FormData();
    formData.append('content', request.content);

    if (request.files?.length) {
      request.files.forEach((file) => {
        formData.append('files', file);
      });
    }

    return this.http.post<Post>(`${API_URL}/posts`, formData);
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}/posts`);
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${API_URL}/posts/${id}`);
  }

  public getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}/posts/user/${userId}`);
  }
}
