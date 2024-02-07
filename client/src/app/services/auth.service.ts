import {Inject, Injectable, signal} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IRole} from "../typeScript/interfaces";
import {GlobalService} from "./global.service";
import {DOCUMENT} from "@angular/common";

class IUser {
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = this._globalService.serverUrl()
  public _token: string | null = null;
  public userGoogle:any = signal(null)
  public userRoles = signal([])

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  loadTokenAndRoles() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      this.setToken(token);
    }

    const roles = localStorage.getItem('user-roles');
    if (roles) {
      this.userRoles.set(JSON.parse(roles));
    }
  }
  getAllRole(): Observable<{ message: string, data: IRole[] }> {
    return this._http.get<{ message: string, data: IRole[] }>(`${this.serverUrl}/api/roles`);
  }

  createRole(roleName: string): Observable<{ message: string, data: IRole }> {
    return this._http.post<{ message: string, data: IRole }>(`${this.serverUrl}/api/roles`, {roleName});
  }

  register(user: IUser): Observable<{ message: string, data: string }> {
    return this._http.post<{ message: string, data: string }>(`${this.serverUrl}/api/auth/register`, user);
  }

  login(user: IUser): Observable<{ message: string, token: string, rolesArray: [] }> {
    return this._http.post<{ message: string, token: string, rolesArray: [] }>(`${this.serverUrl}/api/auth/login`, user)
      .pipe(
        tap(({token, rolesArray}) => {
          localStorage.setItem('auth-token', token);
          localStorage.setItem('user-roles', JSON.stringify(rolesArray)); // Save roles to Local Storage
          this.setToken(token);
          this.userRoles.set(rolesArray);
        })
      );
  }

  setToken(token: string | null ) {
    this._token = token;
  }

  getToken(): string | null {
    return this._token;
  }

  isAuthenticated(): boolean {
    return !!this._token;
  }

  logout() {
    this.userGoogle.set(null);
    this.setToken(null);
    if (typeof localStorage !== 'undefined') {
      // Your code that uses localStorage
      localStorage.clear();
      sessionStorage.clear();
    } else {
      // Handle the case where localStorage is not available
    }
  }
}
