import { NgModule } from '@angular/core';
import { MAT_CARD_CONFIG, MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';

const modules = [
  MatCard,
  MatCardContent,
  MatFormField,
  MatIcon,
  MatInput,
  MatIconButton,
  MatLabel,
  MatCardHeader,
  MatCardFooter,
  MatCardTitle,
  MatCardSubtitle,
  MatButton,
  MatCardActions,
  MatProgressSpinner,
  MatError,
  MatToolbar,
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: true } },
    { provide: MAT_CARD_CONFIG, useValue: { appearance: 'outline' } }
  ]
})
export class MaterialModule {
}
