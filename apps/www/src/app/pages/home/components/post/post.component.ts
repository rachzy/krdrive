import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../types/post';
import { getFileType } from '../../../../util/files';
import { environment } from '../../../../../environments/environment';
import { SessionService } from '../../../../services/session.service';
import {
  MoreOptionsButtonComponent,
  MoreOptionsItem,
} from '../../../../shared/components/more-options-button/more-options-button.component';
import { firstValueFrom } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../../services/modal.service';
import { PostsStoreService } from '../../../../services/posts-store.service';

@Component({
  selector: 'kr-post',
  standalone: true,
  imports: [CommonModule, MoreOptionsButtonComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  private readonly _sessionService = inject(SessionService);
  private readonly _postsStoreService = inject(PostsStoreService);
  private readonly _modalService = inject(ModalService);

  public readonly user$ = this._sessionService.user$;
  public readonly post = input.required<Post>();

  public readonly getFileType = getFileType;

  public getMediaUrlFromServer(url: string): string {
    return `${environment.apiUrl}${url}`;
  }

  public handleDeletePost(postID: string): void {
    this._modalService.open({
      title: 'Delete Post',
      message: 'Are you sure you want to delete this post?',
      type: 'danger',
      primaryButton: {
        label: 'Delete',
        onClick: async () => {
          await this._postsStoreService.deletePost(postID);
        },
      },
      secondaryButton: {
        label: 'Cancel',
        onClick: () => this._modalService.close(),
      },
    });
  }

  public getPostMoreOptions(postID: string): MoreOptionsItem[] {
    return [
      {
        label: 'Delete',
        type: 'danger',
        icon: faTrash,
        onClick: () => this.handleDeletePost(postID),
      },
    ];
  }
}
