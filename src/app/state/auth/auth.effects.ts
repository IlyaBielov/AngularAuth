import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, logout, setAuthenticated } from '@state/auth/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { GALLERY_PAGE, LOGIN_PAGE } from '../../app.routes';
import { TokenService } from '@core/services/token.service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  tokenService = inject(TokenService);
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
        this.tokenService.setToken(token);
        this.router.navigate([`/${GALLERY_PAGE}`]);

        return setAuthenticated({ isAuthenticated: true });
      })
    ));

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailure),
      map(({ error }) => {
        this.tokenService.removeToken();
        
        return setAuthenticated({ isAuthenticated: false });
      })));

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.tokenService.removeToken();
        this.router.navigate([`/${LOGIN_PAGE}`]);

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
