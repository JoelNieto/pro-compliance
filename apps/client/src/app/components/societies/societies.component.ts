import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'pro-compliance-societies',
  standalone: true,
  imports: [MatTableModule],
  template: `<p>societies works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocietiesComponent {}
