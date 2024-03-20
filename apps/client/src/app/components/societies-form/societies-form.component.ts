import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pro-compliance-societies-form',
  standalone: true,
  imports: [CommonModule],
  template: `<p>societies-form works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocietiesFormComponent {}
