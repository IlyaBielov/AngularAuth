import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuthError, selectIsLoadingAuth } from '@core/state/auth/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { login } from '@core/state/auth/auth.actions';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { InputComponent } from '@shared/forms/input/input.component';
import { PasswordComponent } from '@shared/forms/password/password.component';
import { AuthBtnComponent } from '@shared/forms/auth-btn/auth-btn.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatCardFooter,
    MatCardActions,
    InputComponent,
    PasswordComponent,
    AuthBtnComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(Store);
  destroyRef = inject(DestroyRef);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoading = this.store.selectSignal(selectIsLoadingAuth);

  ngOnInit() {
    this.store.select(selectAuthError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        this.loginForm.controls['username'].setErrors({ authError: error });
        this.loginForm.controls['password'].setErrors({ authError: error });
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(() => login({ username, password }));
    }
  }
}
