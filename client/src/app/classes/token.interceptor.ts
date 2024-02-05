import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._auth.isAuthenticated()) {
      const token = this._auth.getToken();
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: token,
          },
        });
      }
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => this.handleAuthError(error)
      )
    )
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this._router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }

    return throwError(() => error)
  }
}
