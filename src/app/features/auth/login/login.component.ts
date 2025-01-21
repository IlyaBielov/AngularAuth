import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '@state/auth/auth.actions';
import { selectAuthError, selectIsLoadingAuth } from '@state/auth/auth.selectors';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [SharedModule, MaterialModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(Store);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoading = toSignal(this.store.select(selectIsLoadingAuth));

  ngOnInit() {
    this.store.select(selectAuthError)
      .subscribe(error => {
        this.loginForm.controls['username'].setErrors({ authError: error });
        this.loginForm.controls['password'].setErrors({ authError: error });
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(login({ username, password }));
    }
  }
}
