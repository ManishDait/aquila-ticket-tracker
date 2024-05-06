import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { tokenInterceptor } from './token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxWebstorageModule.forRoot()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(routes)
  ]
};
