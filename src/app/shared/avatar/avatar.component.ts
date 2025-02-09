import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  link = 'https://avatars.githubusercontent.com/u/37895784?v=4';
  repository = 'https://github.com/IlyaBielov/AngularAuth';
}
