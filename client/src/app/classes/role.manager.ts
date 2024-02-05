import {AuthService} from "../services/auth.service";
import {CanMatchFn, Route, UrlSegment} from "@angular/router";

export function roleManagerGuard(authService: AuthService): CanMatchFn {
  return (route: Route, segments: UrlSegment[]) => {
    const userRoles = authService.userRoles();
    let role = ''

    userRoles.forEach(rol => {
      if (rol === 'manager') {
        role = rol
      }
    });
    if (role && role.includes('manager')) {
      return true;
    }
    return false;
  };
}
