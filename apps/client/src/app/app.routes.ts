import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./sign-in/sign-in.component').then((x) => x.SignInComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (x) => x.DashboardComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((x) => x.HomeComponent),
      },
      {
        path: 'societies',
        loadComponent: () =>
          import('./societies/societies.component').then(
            (x) => x.SocietiesComponent
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./reports/reports.component').then((x) => x.ReportsComponent),
      },
      {
        path: 'participants',
        loadChildren: () =>
          import('./participants/participants.routes').then(
            (x) => x.PARTICIPANTS_ROUTES
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then(
            (x) => x.SettingsComponent
          ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
