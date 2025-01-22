import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@state/auth/auth.selectors';
import { map } from 'rxjs';
import { GALLERY_PAGE, LOGIN_PAGE } from '../../app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map(isAuthenticated => {
      const targetUrl = state.url;

      if (targetUrl === `/${LOGIN_PAGE}` && isAuthenticated) {
        router.navigate([`/${GALLERY_PAGE}`]);

        return false;
      }

      if (!isAuthenticated && targetUrl !== `/${LOGIN_PAGE}`) {
        router.navigate([`/${LOGIN_PAGE}`]);

        return false;
      }

      return true;
    }));
};
