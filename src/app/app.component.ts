import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout, setAuthenticated } from '@state/auth/auth.actions';
import { HeaderComponent } from '@core/layout/header/header.component';
import { selectIsAuthenticated } from '@state/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // Logic that checks token should be in Interceptors, but I don't have any Http requests
  store = inject(Store);

  isAuthenticated: Signal<boolean> = this.store.selectSignal(selectIsAuthenticated);

  ngOnInit() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const hasToken = this.getAuthTokenFromCookies() !== null;

    if (!isAuthenticated || !hasToken) {
      this.store.dispatch(logout());
    } else {
      this.store.dispatch(setAuthenticated({ isAuthenticated: true }));
    }
  }

  private getAuthTokenFromCookies(): string | null {
    const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
    return match ? match[2] : null;
  }
}
