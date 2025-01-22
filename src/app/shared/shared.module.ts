import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthBtnComponent } from '@shared/forms/auth-btn/auth-btn.component';
import { InputComponent } from '@shared/forms/input/input.component';
import { PasswordComponent } from '@shared/forms/password/password.component';
import { LiveBgComponent } from '@shared/live-bg/live-bg.component';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  AuthBtnComponent,
  InputComponent,
  PasswordComponent,
  LiveBgComponent
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {
}
