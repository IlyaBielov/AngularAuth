import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private document = inject(DOCUMENT);

  setToken(token: string) {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    this.document.cookie = `auth_token=${token}; expires=${expiryDate.toUTCString()}; path=/`;
  }

  removeToken() {
    this.document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
