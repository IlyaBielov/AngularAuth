import { Injectable } from '@angular/core';
import { delay, of, switchMap, throwError } from 'rxjs';

const USERNAME = 'admin';
const PASSWORD = 'password123';
const TOKEN = 'fake-jwt-token';
const ERROR = 'Invalid user name or password';
const DELAY = 3000;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string) {
    return of(null).pipe(
      delay(DELAY),
      switchMap(() => username === USERNAME && password === PASSWORD ? of(TOKEN) : throwError(() => ERROR)));
  }
}
