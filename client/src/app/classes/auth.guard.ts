import {AuthService} from "../services/auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";

export class AuthGuard {
  constructor(
    public _auth: AuthService,
    public router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (!this._auth.isAuthenticated()) {
      // SnackBar
      window.alert('Доступ запрещен, для доступа к этой странице требуется вход в систему!');

      this.router.navigate(['login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }
    return of(true);
  }
}
