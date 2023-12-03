import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'pro-compliance-root',
  template: `<pro-compliance-nx-welcome></pro-compliance-nx-welcome>
    <router-outlet></router-outlet> `,
  styles: '',
})
export class AppComponent {
  title = 'client';
}
