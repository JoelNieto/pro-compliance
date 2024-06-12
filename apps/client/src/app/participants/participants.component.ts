import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ParticipantStore } from './participants.store';

@Component({
  selector: 'pro-compliance-participants',
  standalone: true,
  imports: [RouterOutlet],
  providers: [ParticipantStore],
  template: `<router-outlet />`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantsComponent {
  public store = inject(ParticipantStore);
}
