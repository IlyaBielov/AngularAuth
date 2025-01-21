import { LoginComponent } from '@features/auth/login/login.component';

export const routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: '**', redirectTo: '' }
];
