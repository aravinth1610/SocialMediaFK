import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let httpHeaders = new HttpHeaders();
    const authToken = this.authService.getAuthTokenFromCache();
    if (authToken != null) {
      httpHeaders = httpHeaders.append('Authorization','Bearer '+authToken);
    }
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    const newRequest = request.clone({ headers: httpHeaders })

    return next.handle(newRequest).pipe(tap((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 200) {
          return;
        } else if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.router.navigate(['/home']);
        }
      }
    }));
  }
}
