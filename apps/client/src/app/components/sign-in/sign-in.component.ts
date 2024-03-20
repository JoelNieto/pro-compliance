import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'pro-compliance-sign-in',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `<div
    class="flex flex-col items-center justify-center w-full h-dvh bg-gray-50"
  >
    <mat-card class="w-96">
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form action="">
          <mat-form-field>
            <mat-label>Correo</mat-label>
            <input type="email" name="" id="" matInput />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input type="password" name="" id="" matInput />
          </mat-form-field>
          <mat-card-actions align="end">
            <button mat-flat-button color="primary">Entrar</button>
          </mat-card-actions>
        </form>
      </mat-card-content>
    </mat-card>
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {}
