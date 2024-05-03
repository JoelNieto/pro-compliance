import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Society } from '@pro-compliance/models';
import { map, pipe, switchMap, tap } from 'rxjs';

type State = {
  loading: boolean;
  societies: Society[];
  participantId: string;
};

const initial: State = { loading: false, societies: [], participantId: '' };

export const SocietiesStore = signalStore(
  withState(initial),
  withMethods(
    (state, http = inject(HttpClient), snackBar = inject(MatSnackBar)) => {
      const fetchSocieties = rxMethod<void>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          map(() =>
            state.participantId()
              ? `/api/societies?participant=${state.participantId()}`
              : '/api/societies?participant'
          ),
          switchMap((url) => http.get<Society[]>(url)),
          tapResponse({
            next: (societies) => patchState(state, { societies }),
            error: console.error,
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );

      const createSociety = rxMethod<Partial<Society>>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((request) =>
            http.post<Society>('/api/societies', {
              owner: { id: state.participantId() },
              ...request,
            })
          ),
          tapResponse({
            next: (res) => {
              patchState(state, { societies: [res, ...state.societies()] });
              snackBar.open('Sociedad creada');
            },
            error: (error) => {
              console.error(error);
              snackBar.open('Error. Intente nuevamente');
            },
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );

      const updateSociety = rxMethod<Partial<Society>>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((request) =>
            http.patch<Society>(`/api/societies/${request.id}`, request)
          ),
          tapResponse({
            next: (res) => {
              patchState(state, {
                societies: state
                  .societies()
                  .map((x) => (x.id === res.id ? res : x)),
              });
              snackBar.open('Sociedad actualizada');
            },
            error: (error) => {
              console.error(error);
              snackBar.open('Error. Intente nuevamente');
            },
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );

      return { fetchSocieties, createSociety, updateSociety };
    }
  )
);
