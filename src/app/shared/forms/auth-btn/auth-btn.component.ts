import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrl: './auth-btn.component.scss',
  imports: [
    MatButton,
    MatProgressSpinner
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthBtnComponent {
  isLoading = input<boolean>(false);
  isDisabled = input<boolean>(false);
}
