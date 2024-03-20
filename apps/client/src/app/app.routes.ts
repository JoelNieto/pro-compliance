import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/sign-in/sign-in.component').then(
        (x) => x.SignInComponent
      ),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./components/reports/reports.component').then(
            (x) => x.ReportsComponent
          ),
      },
      {
        path: 'participants',
        loadChildren: () =>
          import('./components/participants/participants.routes').then(
            (x) => x.PARTICIPANTS_ROUTES
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./components/settings/settings.component').then(
            (x) => x.SettingsComponent
          ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
