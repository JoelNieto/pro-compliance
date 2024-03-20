import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'pro-compliance-root',
  template: ` <router-outlet></router-outlet> `,
  styles: ``,
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
