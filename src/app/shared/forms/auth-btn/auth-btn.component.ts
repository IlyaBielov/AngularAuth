import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaterialModule } from '@shared/material.module';

@Component({
  selector: 'app-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrl: './auth-btn.component.scss',
  imports: [MaterialModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthBtnComponent {
  isLoading = input<boolean>(false);
  isDisabled = input<boolean>(false);
}
