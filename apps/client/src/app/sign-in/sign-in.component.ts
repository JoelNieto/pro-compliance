import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pro-compliance-sign-in',
  standalone: true,
  imports: [CommonModule],
  template: `<p>sign-in works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {}
