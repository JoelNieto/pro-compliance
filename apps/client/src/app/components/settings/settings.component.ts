import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pro-compliance-settings',
  standalone: true,
  imports: [CommonModule],
  template: `<p>settings works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
