import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { ImageFile } from '@core/models/image-file';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DragUploadComponent } from '@shared/drag-upload/drag-upload.component';
import { ImageGalleryComponent } from '@shared/image-gallery/image-gallery.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [MatCard, MatCardContent, DragUploadComponent, ImageGalleryComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {
  images: WritableSignal<ImageFile[]> = signal(null);

  onUpload($event: ImageFile) {
    this.images.update((images) => images?.length > 0 ? [...images, $event] : [$event]);
  }
}
