import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, logout, setAuthenticated } from '@state/auth/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  document = inject(DOCUMENT);
  router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(token => loginSuccess({ token })),
          catchError(error => of(loginFailure({ error })))
        ))));

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(({ token }) => {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        this.document.cookie = `auth_token=${token}; expires=${expiryDate.toUTCString()}; path=/`;
        this.router.navigate(['/images']);

        return setAuthenticated({ isAuthenticated: true });
      })
    ));

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailure),
      map(({ error }) => {
        this.document.cookie = `auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        return setAuthenticated({ isAuthenticated: false });
      })));

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        this.router.navigate(['/login']);

        return setAuthenticated({ isAuthenticated: false });
      })));

  // I don't have any http requests. That's the reason to make setAuthenticated
  setAuthenticated$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setAuthenticated),
        tap(({ isAuthenticated }) => isAuthenticated
          ? localStorage.setItem('isAuthenticated', 'true')
          : localStorage.removeItem('isAuthenticated'))),
    { dispatch: false, functional: true }
  );
}
