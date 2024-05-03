import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { patchState } from '@ngrx/signals';
import { Society } from '@pro-compliance/models';

import { SocietiesFormComponent } from '../societies-form/societies-form.component';
import { SocietiesStore } from './societies.store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pro-compliance-societies',
  standalone: true,
  providers: [SocietiesStore],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  template: ` <div class="flex justify-between mb-4">
      <h2 class="mat-headline-medium">Sociedades</h2>
      <button mat-flat-button color="primary" (click)="editSociety()">
        <mat-icon>add</mat-icon>
        Nuevo
      </button>
    </div>
    <table mat-table [dataSource]="store.societies()">
      <ng-container matColumnDef="commercial_name">
        <th mat-header-cell *matHeaderCellDef>Nombre comercial</th>
        <td mat-cell *matCellDef="let item">
          {{ item.commercial_name }}
        </td>
      </ng-container>
      <ng-container matColumnDef="code">
        <th mat-header-cell *matHeaderCellDef>Codigo</th>
        <td mat-cell *matCellDef="let item">
          {{ item.code }}
        </td>
      </ng-container>
      <ng-container matColumnDef="ruc">
        <th mat-header-cell *matHeaderCellDef>RUC</th>
        <td mat-cell *matCellDef="let item">
          {{ item.ruc }}
        </td>
      </ng-container>
      <ng-container matColumnDef="jurisdiction">
        <th mat-header-cell *matHeaderCellDef>Jurisdiccion</th>
        <td mat-cell *matCellDef="let item">
          {{ item.jurisdiction.name }}
        </td>
      </ng-container>
      <ng-container matColumnDef="created_at">
        <th mat-header-cell *matHeaderCellDef>Creado</th>
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
            <button mat-menu-item (click)="editSociety(item)">
              <mat-icon color="accent">edit_square</mat-icon>
              <span>Editar</span>
            </button>
          </mat-menu>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedCols"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedCols"></tr>
    </table>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocietiesComponent implements OnInit {
  public participantId = input<string>();
  public store = inject(SocietiesStore);
  private dialog = inject(MatDialog);
  private viewRef = inject(ViewContainerRef);
  public displayedCols = [
    'commercial_name',
    'code',
    'ruc',
    'jurisdiction',
    'created_at',
    'actions',
  ];

  public ngOnInit(): void {
    !!this.participantId() &&
      patchState(this.store, { participantId: this.participantId() });
    this.store.fetchSocieties();
  }

  public editSociety(item?: Society): void {
    this.dialog.open(SocietiesFormComponent, {
      width: '64rem',
      maxWidth: '90vw',
      viewContainerRef: this.viewRef,
      data: { item },
    });
  }
}
