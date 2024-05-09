import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthResponse } from './model/auth';

var isRefreshing: boolean = false;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthToken();

  if (req.headers.has('skip')) {
    return next(req);
  }

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authRequest).pipe(catchError(err => {
    if (err instanceof HttpErrorResponse && err.status === 403) {
      return handleError(req, next, authService);
    } else {
      return throwError(err);
    }
  }));
};

function handleError(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshToken().pipe(
      switchMap((authResponse: AuthResponse) => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authResponse.authToken}`
          }
        });
        isRefreshing = false;
        return next(authReq)
      })
    )
  }

  return next(req)
}

