import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FormBuilder } from '@angular/forms';
import { RawPost } from '../../types/post';
import { PostsService } from '../../services/posts.service';
import { PostComponent } from '../../shared/components/post/post.component';

@Component({
  selector: 'kr-home',
  standalone: true,
  imports: [CommonModule, NewPostComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly _postsService = inject(PostsService);

  public readonly posts$ = this._postsService.posts$;

  public async handleSubmit(rawPost: RawPost): Promise<void> {
    try {
      await this._postsService.addPost(rawPost);
    } catch (error) {
      console.error(error);
    }
  }
}
