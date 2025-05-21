import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Post, RawPost } from '../types/post';
import { PostsService } from '../api/posts.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class PostsStoreService {
  private readonly _sessionService = inject(SessionService);

  public readonly user$ = this._sessionService.user$;

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

  public async addPost(rawPost: RawPost): Promise<void> {
    const user = await firstValueFrom(this.user$);
    if (!user) return;

    const newPost = await firstValueFrom(
      this.postsService.createPost({
        content: rawPost.content,
        files: rawPost.media,
      })
    );

    const populatedPost: Post = {
      ...newPost,
      author: user,
    };
    this._posts.next([populatedPost, ...this._posts.getValue()]);
  }

  public async deletePost(postId: string): Promise<void> {
    try {
      await firstValueFrom(this.postsService.deletePost(postId));
      this._posts.next(
        this._posts.getValue().filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  public refreshPosts(): void {
    this.loadPosts();
  }
}
