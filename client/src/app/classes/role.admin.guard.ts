import {AuthService} from "../services/auth.service";
import {CanMatchFn, Route, UrlSegment} from "@angular/router";

export function roleAdminGuard(authService: AuthService): CanMatchFn {
  return (route: Route, segments: UrlSegment[]) => {
    // Получите значение userRoles из authService
    const userRoles = authService.userRoles();
    let role = ''
    userRoles.forEach(rol => {
      if(rol === 'admin'){
        role = rol
      }
    })
    // Выполните проверку роли и примите решение о доступе
    if (role && role.includes('admin')) {
      return true;
    }
    return false; // Вернуть false, если пользователь не администратор
  };
};
