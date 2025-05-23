import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileUploadButtonComponent } from '../../../../shared/components/file-upload-button/file-upload-button.component';
import { RawPost } from '../../../../types/post';
import { getFileType } from '../../../../util/files';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getProfilePictureByUsername } from '../../../../util/users';
import { SessionService } from 'apps/www/src/app/services/session.service';

@Component({
  selector: 'kr-new-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadButtonComponent,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _sessionService = inject(SessionService);

  public readonly user$ = this._sessionService.user$;

  public readonly handleSubmit = output<RawPost>();

  public readonly form = this._fb.group({
    content: this._fb.control<string>(''),
    media: this._fb.control<File[]>([]),
  });

  public readonly files$ = this.form.get('media')?.valueChanges;
  public readonly getFileType = getFileType;

  public readonly controls = this.form.controls;

  public readonly faTimes = faTimes;

  public readonly getProfilePictureByUsername = getProfilePictureByUsername;

  public handleFileUpload(files: FileList) {
    this.controls.media.setValue([
      ...(this.controls.media.value ?? []),
      ...Array.from(files),
    ]);
  }

  public onSubmit() {
    const formValue = this.form.getRawValue();

    if (!formValue.content && !formValue.media?.length) {
      return;
    }

    const rawPost: RawPost = {
      content: formValue.content || '',
      media: formValue.media || [],
    };
    this.handleSubmit.emit(rawPost);
    this.form.reset();
  }

  public deleteFile(fileName: string) {
    this.controls.media.setValue(
      this.controls.media.value?.filter((file) => file.name !== fileName) ?? []
    );
  }
}
