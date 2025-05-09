import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Post, RawPost } from '../types/post';
import { PostsService } from '../api/posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostsStoreService {
  private readonly _posts = new BehaviorSubject<Post[]>([]);
  public readonly posts$ = this._posts.asObservable();

  constructor(private postsService: PostsService) {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this._posts.next(posts);
    });
  }

  public getPosts(): Post[] {
    return this._posts.getValue();
  }

  public addPost(rawPost: RawPost): Observable<Post> {
    return this.postsService
      .createPost({
        content: rawPost.content,
        files: rawPost.media,
      })
      .pipe(
        tap((newPost) => {
          this._posts.next([newPost, ...this._posts.getValue()]);
        })
      );
  }

  public removePost(postId: string): void {
    // TODO: Implement delete endpoint in backend
    this._posts.next(
      this._posts.getValue().filter((post) => post._id !== postId)
    );
  }

  public refreshPosts(): void {
    this.loadPosts();
  }
}
