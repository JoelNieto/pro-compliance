import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Country, Society } from '@pro-compliance/models';

import { AppStore } from '../../app.store';
import { SocietiesStore } from '../societies/societies.store';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'pro-compliance-societies-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  template: ` <form [formGroup]="form" (ngSubmit)="saveSociety()">
    <h2 mat-dialog-title>Datos de la sociedad</h2>

    <mat-dialog-content class="py-4 grid grid-cols-1 gap-4 md:grid-cols-4">
      <mat-form-field>
        <mat-label>Nombre comercial</mat-label>
        <input matInput formControlName="commercial_name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Codigo</mat-label>
        <input matInput formControlName="code" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Numero de cuenta</mat-label>
        <input
          matInput
          formControlName="account_number"
          autocomplete="new-password"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>RUC</mat-label>
        <input matInput formControlName="ruc" autocomplete="new-password" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Fecha registro</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          formControlName="registration_date"
        />
        <mat-hint>DD/MM/AAAA</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Jurisdiccion</mat-label>
        <mat-select formControlName="jurisdiction" [compareWith]="compareFn">
          @for (country of appStore.countries(); track country.id) {
          <mat-option [value]="country">{{ country.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-stroked-button mat-dialog-close>
        <mat-icon>close</mat-icon>
        Cancelar
      </button>
      <button type="submit" mat-flat-button [disabled]="form.invalid">
        Guardar cambios
      </button>
    </mat-dialog-actions>
  </form>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocietiesFormComponent implements OnInit {
  public appStore = inject(AppStore);
  private store = inject(SocietiesStore);
  private data: { item: Society | undefined } = inject(DIALOG_DATA);

  public form = new FormGroup({
    commercial_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    account_number: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ruc: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    registration_date: new FormControl<Date>(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    jurisdiction: new FormControl<Country | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public ngOnInit(): void {
    const { item } = this.data;
    !!item && this.form.patchValue(item);
  }

  public saveSociety(): void {
    const { item } = this.data;
    if (!item) {
      this.store.createSociety(this.form.getRawValue());
      return;
    }
    this.store.updateSociety({ ...item, ...this.form.getRawValue() });
  }

  public compareFn(c1: Country, c2: Country): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
