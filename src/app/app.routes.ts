import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const GALLERY_PAGE = 'gallery';
export const LOGIN_PAGE = 'login';

export const routes: Routes = [
  {
    path: LOGIN_PAGE,
    loadComponent: () => import('@features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [authGuard]
  },
  {
    path: GALLERY_PAGE,
    loadComponent: () => import('@features/gallery/gallery.component').then(m => m.GalleryComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: `/${LOGIN_PAGE}`, pathMatch: 'full' },
  { path: '**', redirectTo: `/${GALLERY_PAGE}` },
];
