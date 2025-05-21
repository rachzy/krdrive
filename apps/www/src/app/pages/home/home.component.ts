import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './components/new-post/new-post.component';
import { Post, RawPost } from '../../types/post';
import { PostsStoreService } from '../../services/posts-store.service';
import { map } from 'rxjs';
import { PostComponent } from './components/post/post.component';

@Component({
  selector: 'kr-home',
  standalone: true,
  imports: [CommonModule, NewPostComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly _postsService = inject(PostsStoreService);
  public readonly posts$ = this._postsService.posts$;
  public readonly postsByColumns = this.posts$.pipe(
    map((posts: Post[]) => {
      const columns = Array.from({ length: 4 }, () => [] as Post[]);
      posts.forEach((post, index) => {
        columns[index % 4].push(post);
      });
      return columns;
    })
  );

  public async handleSubmit(rawPost: RawPost): Promise<void> {
    try {
      await this._postsService.addPost(rawPost);
    } catch (error) {
      console.error(error);
    }
  }
}
