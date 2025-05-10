import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SessionInterceptor } from './interceptors/session.interceptor';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/api/auth/login'],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
