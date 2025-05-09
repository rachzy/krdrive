import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './components/new-post/new-post.component';
import { RawPost } from '../../types/post';
import { PostsStoreService } from '../../services/posts-store.service';
import { firstValueFrom } from 'rxjs';
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

  public async handleSubmit(rawPost: RawPost): Promise<void> {
    console.log(rawPost);
    try {
      await firstValueFrom(this._postsService.addPost(rawPost));
    } catch (error) {
      console.error(error);
    }
  }
}
