import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Country } from '@pro-compliance/models';
import { pipe, switchMap } from 'rxjs';

type State = {
  countries: Country[];
};

const initial: State = { countries: [] };

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initial),
  withMethods((state, http = inject(HttpClient)) => ({
    fetchCountries: rxMethod<void>(
      pipe(
        switchMap(() => http.get<Country[]>('/api/countries')),
        tapResponse({
          next: (countries) => patchState(state, { countries }),
          error: console.error,
        })
      )
    ),
  })),
  withHooks({
    onInit({ fetchCountries }) {
      fetchCountries();
    },
  })
);
