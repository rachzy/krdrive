import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post, RawPost } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly _posts = new BehaviorSubject<Post[]>([]);
  public readonly posts$ = this._posts.asObservable();

  public getPosts(): Post[] {
    return this._posts.getValue();
  }

  public addPost(rawPost: RawPost) {
    const newPost: Post = {
      ...rawPost,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      userId: 'current-user-id', // TODO: Get from auth service
    };

    this._posts.next([newPost, ...this._posts.getValue()]);
  }

  public removePost(postId: string) {
    this._posts.next(
      this._posts.getValue().filter((post) => post.id !== postId)
    );
  }
}
