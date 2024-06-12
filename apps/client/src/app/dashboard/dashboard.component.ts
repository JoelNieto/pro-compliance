import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'pro-compliance-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIcon,
    RouterOutlet,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatTooltip,
    NgClass,
  ],
  template: `
    <mat-sidenav-container autosize class="h-full">
      <mat-sidenav
        [ngClass]="!isCollapsed() ? 'expanded' : ''"
        [mode]="isMobile() ? 'over' : 'side'"
        [opened]="!isMobile()"
        class="pt-4"
      >
        <div class="flex justify-between items-center">
          <button mat-icon-button aria-label="Menu icon" (click)="toggleMenu()">
            <mat-icon>menu</mat-icon>
          </button>
          @if (!isCollapsed()) {
          <h3 class="mat-title-large">ProCompliance</h3>
          }
        </div>

        <mat-nav-list class="gap-2">
          <a
            mat-list-item
            routerLink="home"
            routerLinkActive
            #home="routerLinkActive"
            [activated]="home.isActive"
            matTooltip="Inicio"
            matTooltipPosition="right"
          >
            <mat-icon matListItemIcon>home</mat-icon> @if (!isCollapsed()) {
            <div matListItemTitle>Inicio</div>
            }
          </a>
          <a
            mat-list-item
            routerLink="participants"
            routerLinkActive
            #participants="routerLinkActive"
            [activated]="participants.isActive"
            matTooltip="Participantes"
            matTooltipPosition="right"
          >
            <mat-icon matListItemIcon>group</mat-icon>
            @if (!isCollapsed()) {
            <div matListItemTitle>Participantes</div>
            } </a
          ><a
            mat-list-item
            routerLink="societies"
            routerLinkActive
            #societies="routerLinkActive"
            [activated]="societies.isActive"
            matTooltip="Sociedades"
            matTooltipPosition="right"
          >
            <mat-icon matListItemIcon>domain</mat-icon>
            @if (!isCollapsed()) {
            <div matListItemTitle>Sociedades</div>
            }
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
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content
        class="p-4 flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
        [class.pt-16]="isMobile()"
      >
        <main>
          <div class="mx-auto">
            <router-outlet />
          </div>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav {
        @apply w-20 px-2;
      }

      .expanded {
        width: 230px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public sidenav = viewChild.required(MatSidenav);
  private observer = inject(BreakpointObserver);
  public isMobile = signal(true);
  public isCollapsed = signal(true);

  public ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile.set(true);
      } else {
        this.isMobile.set(false);
      }
    });
  }

  public toggleMenu(): void {
    if (this.isMobile()) {
      this.sidenav().toggle();
      this.isCollapsed.set(false);
    } else {
      this.sidenav().open();
      this.isCollapsed.update((value) => !value);
    }
  }
}
