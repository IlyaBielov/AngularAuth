import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '@state/auth/auth.actions';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AvatarComponent } from '@shared/avatar/avatar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    MatToolbar,
    MatButton,
    AvatarComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  store = inject(Store);

  logout() {
    this.store.dispatch(() => logout());
  }
}
