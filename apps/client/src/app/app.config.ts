import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-MX';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { es } from 'date-fns/locale';

import { appRoutes } from './app.routes';

registerLocaleData(localeEs, 'es-MX');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: MAT_DATE_LOCALE, useValue: es },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withComponentInputBinding()
    ),
    provideAnimations(),
    provideDateFnsAdapter(),
  ],
};
