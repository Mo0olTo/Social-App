import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withHashLocation() , withInMemoryScrolling({scrollPositionRestoration:'top'})),
      provideClientHydration(withEventReplay()),provideAnimations(),provideToastr(
        {
          timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
        }
      ),
      provideHttpClient(withFetch() , withInterceptors([headersInterceptor]))
    
    
    ]
};
