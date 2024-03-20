import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { patchState } from '@ngrx/signals';

import { AgePipe } from '../../../pipes/age.pipe';
import { SocietiesComponent } from '../../societies/societies.component';
import { ParticipantStore } from '../participants.store';

@Component({
  selector: 'pro-compliance-participant-details',
  standalone: true,
  template: `<mat-card>
    <mat-card-header class="py-3">
      <mat-card-title class="text-3xl font-sans text-gray-700 font-semibold"
        >{{ store.selected()?.first_name }}
        {{ store.selected()?.last_name }}</mat-card-title
      >
    </mat-card-header>
    <mat-card-content>
      <h3>Info</h3>
      <div class="grid grid-cols-4 gap-2">
        <div class="flex flex-col">
          <span>Documento</span>
          {{ store.selected()?.document_id }}
        </div>
        <div class="flex flex-col">
          <span>Pais de residencia</span>
          {{ store.selected()?.residence_country?.name }}
        </div>
        <div class="flex flex-col">
          <span>Pais de nacionalidad</span>
          {{ store.selected()?.nationality?.name }}
        </div>
        <div class="flex flex-col">
          <span>Pais de nacimiento</span>
          {{ store.selected()?.birth_country?.name }}
        </div>
        <div class="flex flex-col">
          <span>Genero</span>
          {{ store.selected()?.gender }}
        </div>
        <div class="flex flex-col">
          <span>Fecha de nacimiento</span>
          {{ store.selected()?.birth_date | date : 'dd/MM/yyyy' }}
        </div>
        <div class="flex flex-col">
          <span>Edad</span>
          {{ store.selected()?.birth_date! | age }}
        </div>
        <div class="flex flex-col">
          <span>Email</span>
          {{ store.selected()?.email }}
        </div>
        <div class="flex flex-col">
          <span>Creado</span>
          {{ store.selected()?.created_at | date : 'medium' }}
        </div>
        <div class="flex flex-col col-span-2">
          <span>Direccion</span>
          {{ store.selected()?.address }}
        </div>
      </div>
      <mat-tab-group class="mt-3">
        <mat-tab label="Sociedades">
          <pro-compliance-societies />
        </mat-tab>
        <mat-tab label="Documentos"></mat-tab>
      </mat-tab-group>
    </mat-card-content>
  </mat-card> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatTabsModule,
    DatePipe,
    AgePipe,
    SocietiesComponent,
  ],
})
export class ParticipantDetailsComponent implements OnInit {
  public participantId = input.required<string>();
  public store = inject(ParticipantStore);

  public ngOnInit(): void {
    patchState(this.store, { selectedId: this.participantId() });
  }
}
