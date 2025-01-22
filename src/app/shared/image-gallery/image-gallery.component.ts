import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SortableDirective } from '@core/directives/sortable.directive';
import { MaterialModule } from '@shared/material.module';
import { ImageFile } from '@core/models/image-file';

@Component({
  selector: 'app-image-gallery',
  imports: [SortableDirective, MaterialModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGalleryComponent {
  images = input<ImageFile[]>();
}
