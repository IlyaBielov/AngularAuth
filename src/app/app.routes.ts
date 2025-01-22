import { Routes } from '@angular/router';
import { LoginComponent } from '@features/auth/login/login.component';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'images',
    loadComponent: () => import('./features/images/images.component').then(m => m.ImagesComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/images' },
];
