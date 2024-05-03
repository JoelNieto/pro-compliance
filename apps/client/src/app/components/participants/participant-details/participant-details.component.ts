import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { patchState } from '@ngrx/signals';

import { AgePipe } from '../../../pipes/age.pipe';
import { SocietiesComponent } from '../../societies/societies.component';
import { ParticipantStore } from '../participants.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantsFormComponent } from '../participants-form/participants-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'pro-compliance-participant-details',
  standalone: true,
  template: `
    @if (store.loading()) {
    <div class="flex items-center justify-center w-full h-28">
      <mat-progress-spinner mode="indeterminate" />
    </div>

    } @else {
    <div class="flex gap-4 items-baseline">
      <a mat-button routerLink="/app/participants">
        <mat-icon>arrow_back</mat-icon>
        Volver
      </a>
      <h3 class="mat-headline-small">Participantes</h3>
    </div>
    <div class="flex gap-4 items-baseline">
      <h2 class="mat-headline-large">
        {{ store.selected()?.first_name }} {{ store.selected()?.last_name }}
      </h2>
      <button mat-flat-button color="accent" (click)="editParticipant()">
        <mat-icon>edit</mat-icon>
        Editar
      </button>
    </div>

    <mat-tab-group class="mt-3">
      <mat-tab label="Info">
        <mat-tab-nav-panel class="p-4">
          <h3 class="mat-headline-small">Info</h3>
          <div class="grid grid-cols-4 gap-2">
            <div class="flex flex-col">
              <span class="mat-label-large">Documento</span>
              <p class="mat-body">{{ store.selected()?.document_id }}</p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Pais de residencia</span>
              <p class="mat-body">
                {{ store.selected()?.residence_country?.name }}
              </p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Pais de nacionalidad</span>
              <p class="mat-body">{{ store.selected()?.nationality?.name }}</p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Pais de nacimiento</span>
              <p class="mat-body">
                {{ store.selected()?.birth_country?.name }}
              </p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Genero</span>
              <p class="mat-body">{{ store.selected()?.gender }}</p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Fecha de nacimiento</span>
              <p class="mat-body">
                {{ store.selected()?.birth_date | date : 'dd/MM/yyyy' }}
              </p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Edad</span>
              <p class="mat-body">{{ store.selected()?.birth_date! | age }}</p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Email</span>
              <p class="mat-body">{{ store.selected()?.email }}</p>
            </div>
            <div class="flex flex-col">
              <span class="mat-label-large">Creado</span>
              <p class="mat-body">
                {{ store.selected()?.created_at | date : 'medium' }}
              </p>
            </div>
            <div class="flex flex-col col-span-2">
              <span class="mat-label-large">Direccion</span>
              <p class="mat-body">{{ store.selected()?.address }}</p>
            </div>
          </div>
        </mat-tab-nav-panel>
      </mat-tab>
      <mat-tab label="Sociedades">
        <mat-tab-nav-panel class="p-4">
          <pro-compliance-societies [participantId]="id()" />
        </mat-tab-nav-panel>
      </mat-tab>
      <mat-tab label="Documentos"></mat-tab>
    </mat-tab-group>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    DatePipe,
    AgePipe,
    MatProgressSpinner,
    SocietiesComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
})
export class ParticipantDetailsComponent implements OnInit {
  public id = input.required<string>();
  public store = inject(ParticipantStore);
  private dialog = inject(MatDialog);
  private viewContainer = inject(ViewContainerRef);

  public ngOnInit(): void {
    patchState(this.store, { selectedId: this.id() });
  }

  public editParticipant(): void {
    this.dialog.open(ParticipantsFormComponent, {
      width: '64rem',
      viewContainerRef: this.viewContainer,
      data: { participant: this.store.selected() },
    });
  }
}
