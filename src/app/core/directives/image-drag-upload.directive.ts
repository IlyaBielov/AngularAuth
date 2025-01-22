import { Directive, HostListener, inject, output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageFile } from '@core/models/image-file';

@Directive({
  selector: '[appImageDragUpload]'
})
export class ImageDragUploadDirective {
  dropFiles = output<ImageFile>();

  private sanitizer = inject(DomSanitizer);
  private files: ImageFile[] = [];

  @HostListener("dragover", ["$event"]) dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener("dragleave", ["$event"]) dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener("drop", ["$event"]) drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    let fileList = event.dataTransfer.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        const url = this.sanitizer.bypassSecurityTrustUrl(window['URL'].createObjectURL(file));

        // Simple way of fixing bug of the existing files in gallery
        const find = this.files.find((fileItem) => {
          const k = 40; // length of the hashed name of the file
          return file.name.length === k && (fileItem.file.size === file.size);
        });

        if (!find) {
          this.files.push({ file, url });
          this.dropFiles.emit({ file, url });
        }
      }
    }
  }
}
