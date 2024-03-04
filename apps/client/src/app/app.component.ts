import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'pro-compliance-root',
  template: ` <router-outlet></router-outlet> `,
  styles: ``,
})
export class AppComponent {
  title = 'client';
  private http = inject(HttpClient);
}
