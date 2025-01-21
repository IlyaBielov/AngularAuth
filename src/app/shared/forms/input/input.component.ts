import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [MaterialModule, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  label = input<string>('');
  control = input<FormControl>(new FormControl());
}
