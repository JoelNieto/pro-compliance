import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ParticipantStore } from './participants.store';

@Component({
  selector: 'pro-compliance-participants',
  standalone: true,
  imports: [MatCardModule],
  providers: [ParticipantStore],
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>Participantes</mat-card-title>
    </mat-card-header>
    <mat-card-content></mat-card-content>
  </mat-card>`,
  styles: [
    `
      mat-card {
        width: 60vw;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantsComponent {
  public store = inject(ParticipantStore);
}
