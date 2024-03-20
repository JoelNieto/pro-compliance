import { Dialog } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Participant } from '@pro-compliance/models';

import { ParticipantsFormComponent } from '../participants-form/participants-form.component';
import { ParticipantStore } from '../participants.store';

@Component({
  selector: 'pro-compliance-participants-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    MatPaginator,
    MatSortModule,
  ],
  template: `<mat-card class="w-4/5 min-h-64">
    <mat-card-header>
      <mat-card-title class="text-2xl text-gray-700 font-semibold leading-tight"
        >Participantes</mat-card-title
      >
    </mat-card-header>
    <mat-card-content>
      <div class="flex w-full justify-end">
        <button mat-flat-button color="primary" (click)="newParticipant()">
          Nuevo
        </button>
      </div>
      <table mat-table [dataSource]="dataSource()" matSort>
        <ng-container matColumnDef="last_name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Apellidos</th>
          <td mat-cell *matCellDef="let item">
            {{ item.last_name }}
          </td>
        </ng-container>
        <ng-container matColumnDef="first_name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombres</th>
          <td mat-cell *matCellDef="let item">
            {{ item.first_name }}
          </td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
          <td mat-cell *matCellDef="let item">
            {{ item.email }}
          </td>
        </ng-container>
        <ng-container matColumnDef="residence_country">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            Pais residencia
          </th>
          <td mat-cell *matCellDef="let item">
            {{ item.residence_country.name }}
          </td>
        </ng-container>
        <ng-container matColumnDef="created_at">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Creado</th>
          <td mat-cell *matCellDef="let item">
            {{ item.created_at | date : 'medium' }}
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <a
                mat-menu-item
                routerLink="../details"
                [queryParams]="{ participantId: item.id }"
              >
                <mat-icon color="primary">feed</mat-icon>
                <span>Detalles</span>
              </a>
              <button mat-menu-item (click)="editParticipant(item)">
                <mat-icon color="accent">edit_square</mat-icon>
                <span>Editar</span>
              </button>
              <button mat-menu-item (click)="store.deleteParticipant(item.id)">
                <mat-icon color="warn">delete</mat-icon><span>Borrar</span>
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedCols"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedCols"></tr>
      </table>
      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic elements"
      />
    </mat-card-content>
  </mat-card>`,
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantsListComponent {
  public store = inject(ParticipantStore);
  private containerRef = inject(ViewContainerRef);
  public displayedCols = [
    'last_name',
    'first_name',
    'email',
    'residence_country',
    'created_at',
    'actions',
  ];
  private dialog = inject(Dialog);
  public paginator = viewChild.required<MatPaginator>(MatPaginator);
  public sort = viewChild.required<MatSort>(MatSort);
  constructor() {
    effect(() => {
      if (this.store.participants().length) {
        this.dataSource().paginator = this.paginator();
        this.dataSource().sort = this.sort();
      }
    });
  }

  public dataSource = computed(
    () => new MatTableDataSource(this.store.participants())
  );

  public newParticipant(): void {
    this.dialog.open(ParticipantsFormComponent, {
      width: '64rem',
      maxWidth: '90%',
      viewContainerRef: this.containerRef,
    });
  }

  public editParticipant(participant: Participant): void {
    this.dialog.open(ParticipantsFormComponent, {
      width: '64rem',
      maxWidth: '90%',
      data: { participant },
      viewContainerRef: this.containerRef,
    });
  }
}
