import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  // Verify token before making the request
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.sessionService.verifyToken();

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.sessionService.verifyToken();
        }
        return throwError(() => error);
      })
    );
  }
}
