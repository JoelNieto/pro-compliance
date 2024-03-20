import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Participant } from '@pro-compliance/models';
import { pipe, switchMap, tap } from 'rxjs';

type State = {
  participants: Participant[];
  selectedId: string | undefined;
  loading: boolean;
};

const initial: State = {
  participants: [],
  loading: false,
  selectedId: undefined,
};

export const ParticipantStore = signalStore(
  withState(initial),
  withComputed((state) => ({
    selected: computed(() =>
      state.participants().find((x) => x.id === state.selectedId())
    ),
  })),
  withMethods(
    (
      state,
      http = inject(HttpClient),
      dialog = inject(Dialog),
      snackBar = inject(MatSnackBar)
    ) => {
      const fetchItems = rxMethod<void>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap(() => http.get<Participant[]>('/api/participants')),
          tapResponse({
            next: (participants) => patchState(state, { participants }),
            error: console.error,
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );

      const createParticipant = rxMethod<Partial<Participant>>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((request) =>
            http.post<Participant>('/api/participants', request)
          ),
          tapResponse({
            next: (response) => {
              snackBar.open('Participante creado exitosamente');
              dialog.closeAll();
              patchState(state, {
                participants: [...state.participants(), response],
              });
            },
            error: (error) => {
              console.error(error);
              snackBar.open('Algo salio mal');
            },
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );

      const updateParticipant = rxMethod<{
        id: string;
        request: Partial<Participant>;
      }>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap(({ id, request }) =>
            http.patch<Participant>(`/api/participants/${id}`, request)
          ),
          tapResponse({
            next: (response) => {
              snackBar.open('Participante actualizado exitosamente');
              dialog.closeAll();
              patchState(state, {
                participants: state
                  .participants()
                  .map((x) => (x.id === response.id ? response : x)),
              });
            },
            error: (error) => {
              console.error(error);
              snackBar.open('Algo salio mal');
            },
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );

      const deleteParticipant = rxMethod<string>(
        pipe(
          tap(() => patchState(state, { loading: true })),
          switchMap((id) => http.delete<void>(`/api/participants/${id}`)),
          tapResponse({
            next: () => {
              snackBar.open('Participante eliminado exitosamente');
              dialog.closeAll();
              fetchItems();
            },
            error: (error) => {
              console.error(error);
              snackBar.open('Algo salio mal');
            },
            finalize: () => patchState(state, { loading: false }),
          })
        )
      );
      return {
        fetchItems,
        createParticipant,
        updateParticipant,
        deleteParticipant,
      };
    }
  ),
  withHooks({
    onInit({ fetchItems }) {
      fetchItems();
    },
  })
);
