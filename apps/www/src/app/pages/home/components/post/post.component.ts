import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'apps/www/src/app/types/post';
import { getFileType } from 'apps/www/src/app/util/files';
import { environment } from 'apps/www/src/environments/environment';

@Component({
  selector: 'kr-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  public readonly post = input.required<Post>();

  public readonly getFileType = getFileType;

  public getMediaUrlFromServer(url: string): string {
    return `${environment.apiUrl}${url}`;
  }
}
