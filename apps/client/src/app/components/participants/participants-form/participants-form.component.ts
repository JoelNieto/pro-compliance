import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Country, Participant } from '@pro-compliance/models';

import { AppStore } from '../../../app.store';
import { ParticipantStore } from '../participants.store';

@Component({
  selector: 'pro-compliance-participants-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  template: `<form
    [formGroup]="form"
    (ngSubmit)="saveChanges()"
    class="w-full flex flex-col rounded bg-white p-6"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Datos del participante</h2>
      <button mat-icon-button type="button" (click)="dialogRef.close()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div class="grid lg:grid-cols-4 py-4 gap-4">
      <mat-form-field class="col-span-2">
        <mat-label>Nombres</mat-label>
        <input
          type="text"
          matInput
          formControlName="first_name"
          placeholder="Nombre participante"
        />
      </mat-form-field>
      <mat-form-field class="col-span-2">
        <mat-label>Apellidos</mat-label>
        <input type="text" formControlName="last_name" matInput />
      </mat-form-field>
      <mat-form-field class="col-span-2">
        <mat-label>Direccion</mat-label>
        <input type="text" formControlName="address" matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="email" formControlName="email" matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Nro. Documento</mat-label>
        <input type="text" formControlName="document_id" matInput />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Fec. nacimiento</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="birth_date" />
        <mat-hint>DD/MM/AAAA</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Pais de residencia</mat-label>
        <mat-select
          formControlName="residence_country"
          [compareWith]="compareFn"
        >
          @for(country of appStore.countries(); track country.id ) {
          <mat-option [value]="country">{{ country.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Pais de nacimiento</mat-label>
        <mat-select formControlName="birth_country" [compareWith]="compareFn">
          @for(country of appStore.countries(); track country.id ) {
          <mat-option [value]="country">{{ country.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Nacionalidad</mat-label>
        <mat-select formControlName="nationality" [compareWith]="compareFn">
          @for(country of appStore.countries(); track country.id ) {
          <mat-option [value]="country">{{ country.name }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Genero</mat-label>
        <mat-select formControlName="gender">
          <mat-option value="female">Femenino</mat-option>
          <mat-option value="male">Masculino</mat-option>
          <mat-option value="nb">N/B</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        [disabled]="form.invalid"
        mat-flat-button
        color="accent"
      >
        Guardar cambios
      </button>
    </div>
  </form>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantsFormComponent implements OnInit {
  public appStore = inject(AppStore);
  private store = inject(ParticipantStore);

  private data: { participant: Participant | undefined } | undefined =
    inject(DIALOG_DATA);
  public dialogRef = inject(DialogRef);

  public form = new FormGroup({
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    document_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    residence_country: new FormControl<Country | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    birth_country: new FormControl<Country | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nationality: new FormControl<Country | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    birth_date: new FormControl<Date | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gender: new FormControl<'female' | 'male' | 'nb' | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public ngOnInit(): void {
    if (this.data?.participant) {
      this.form.patchValue(this.data.participant);
    }
  }

  public saveChanges(): void {
    if (!this.data?.participant) {
      this.store.createParticipant(this.form.getRawValue());
      return;
    }

    const { participant } = this.data;

    this.store.updateParticipant({
      id: participant.id,
      request: { ...participant, ...this.form.getRawValue() },
    });
  }

  public compareFn(c1: Country, c2: Country): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
