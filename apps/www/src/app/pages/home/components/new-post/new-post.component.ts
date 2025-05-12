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

const MAX_FILE_NAME_LENGTH = 15;
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

  public readonly handleSubmit = output<RawPost>();

  public readonly form = this._fb.group({
    content: this._fb.control<string>('', [Validators.required]),
    media: this._fb.control<File[]>([]),
  });

  public readonly files$ = this.form.get('media')?.valueChanges;
  public readonly getFileType = getFileType;

  public readonly controls = this.form.controls;

  public readonly faTimes = faTimes;

  public handleFileUpload(files: FileList) {
    this.controls.media.setValue([
      ...(this.controls.media.value ?? []),
      ...Array.from(files),
    ]);
  }

  public onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
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
