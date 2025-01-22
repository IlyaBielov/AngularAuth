import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-live-bg',
  templateUrl: './live-bg.component.html',
  styleUrl: './live-bg.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveBgComponent {

}
