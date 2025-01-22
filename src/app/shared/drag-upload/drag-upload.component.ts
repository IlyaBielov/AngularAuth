import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ImageDragUploadDirective } from '@core/directives/image-drag-upload.directive';
import { ImageFile } from '@core/models/image-file';

@Component({
  selector: 'app-drag-upload',
  imports: [
    ImageDragUploadDirective
  ],
  templateUrl: './drag-upload.component.html',
  styleUrl: './drag-upload.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragUploadComponent {
  onUpload = output<ImageFile>();
}
