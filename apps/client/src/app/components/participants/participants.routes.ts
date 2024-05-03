import { Routes } from '@angular/router';

export const PARTICIPANTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./participants.component').then((x) => x.ParticipantsComponent),
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./participants-list/participants-list.component').then(
            (x) => x.ParticipantsListComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./participant-details/participant-details.component').then(
            (x) => x.ParticipantDetailsComponent
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];
