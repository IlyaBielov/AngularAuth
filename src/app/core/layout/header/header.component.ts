import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { Store } from '@ngrx/store';
import { logout } from '@state/auth/auth.actions';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [SharedModule, MaterialModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  store = inject(Store);

  logout() {
    this.store.dispatch(() => logout());
  }
}
