import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pro-compliance-reports',
  standalone: true,
  imports: [CommonModule],
  template: `<p>reports works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {}
