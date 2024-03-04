import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'pro-compliance-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `<mat-drawer-container class="dashboard-container" autosize>
    <mat-drawer class="app-drawer" mode="side" opened>
      <mat-list class="px-4"
        ><a mat-list-item routerLink="home" routerLinkActive="active-list-item"
          >Inicio
        </a>
        <a
          mat-list-item
          style="color: red;"
          routerLink="participants"
          routerLinkActive="active-list-item"
          >Participantes
        </a>
        <a
          mat-list-item
          routerLink="reports"
          routerLinkActive="active-list-item"
          >Reports
        </a>
        <a
          mat-list-item
          routerLink="settings"
          routerLinkActive="active-list-item"
          >Ajustes
        </a>
      </mat-list>
    </mat-drawer>

    <mat-drawer-content class="app-content"
      ><router-outlet />
    </mat-drawer-content>
  </mat-drawer-container>`,
  styles: [
    `
      .dashboard-container {
        height: 100%;
        margin: 0%;
      }

      .app-content {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      .app-drawer {
        width: 230px;
        @apply bg-sky-700 border-none;
      }

      .mat-mdc-list-item {
        @apply text-white;
      }

      .active-list-item {
        @apply bg-sky-600 rounded;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
