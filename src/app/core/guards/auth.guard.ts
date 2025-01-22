import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@state/auth/auth.selectors';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map(isAuthenticated => {
      const targetUrl = state.url;

      if (targetUrl === '/home' && isAuthenticated) {
        router.navigate(['/images']);

        return false;
      }

      if (!isAuthenticated && targetUrl !== '/home') {
        router.navigate(['/home']);

        return false;
      }

      return true;
    }));
};
