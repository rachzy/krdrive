import { Component, ElementRef, ViewChild, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kr-file-upload-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss'],
})
export class FileUploadButtonComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public readonly accept = input<string>('*/*');
  public readonly multiple = input<boolean>(false);
  public readonly buttonText = input<string>('Upload');
  public readonly buttonClass = input<string>('');

  public readonly filesSelected = output<FileList>();

  onButtonClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.filesSelected.emit(input.files);
      // Reset the input value so the same file can be selected again
      input.value = '';
    }
  }
}
