import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {AuthService} from "./services/auth.service";
import {TokenInterceptor} from "./classes/token.interceptor";
import {roleAdminGuard} from "./classes/role.admin.guard";
import {roleManagerGuard} from "./classes/role.manager";
import {CookieService} from "ngx-cookie-service";
import {routes} from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '170204314564-mnae3oc2l6m131cg16d6cnchdlfdkf48.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },

    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },

    {
      provide: 'roleAdminGuard',
      useFactory: roleAdminGuard,
      deps: [AuthService]
    },
    {
      provide: 'roleManagerGuard',
      useFactory: roleManagerGuard,
      deps: [AuthService]
    }, provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
