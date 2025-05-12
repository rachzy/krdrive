import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../types/post';
import { getFileType } from '../../../../util/files';
import { environment } from '../../../../../environments/environment';

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
