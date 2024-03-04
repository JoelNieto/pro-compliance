import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Participant } from '@pro-compliance/models';
import { pipe, switchMap, tap } from 'rxjs';

type State = {
  participants: Participant[];
  loading: boolean;
};

const initial: State = { participants: [], loading: false };

export const ParticipantStore = signalStore(
  withState(initial),
  withMethods((state, http = inject(HttpClient)) => ({
    fetchItems: rxMethod<void>(
      pipe(
        tap(() => patchState(state, { loading: true })),
        switchMap(() => http.get<Participant[]>('/api/participants')),
        tapResponse({
          next: (participants) => patchState(state, { participants }),
          error: console.error,
          finalize: () => patchState(state, { loading: false }),
        })
      )
    ),
  })),
  withHooks({
    onInit({ fetchItems }) {
      fetchItems();
    },
  })
);
