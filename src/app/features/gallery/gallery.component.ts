import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/material.module';
import { ImageFile } from '@core/models/image-file';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [SharedModule, MaterialModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {
  images: WritableSignal<ImageFile[]> = signal(null);

  onUpload($event: ImageFile) {
    this.images.update((images) => images?.length > 0 ? [...images, $event] : [$event]);
  }
}
