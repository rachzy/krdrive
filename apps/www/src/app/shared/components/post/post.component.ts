import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../types/post';

@Component({
  selector: 'kr-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  public readonly post = input.required<Post>();

  getMediaUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}
