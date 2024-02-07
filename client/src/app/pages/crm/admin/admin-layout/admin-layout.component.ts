import { Component } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {MatToolbar} from "@angular/material/toolbar";
import {AdminMenuComponent} from "../admin-menu/admin-menu.component";
import {MatAnchor} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DirectoryAppComponent} from "../directory-app/directory-app.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    MatToolbar,
    AdminMenuComponent,
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    DirectoryAppComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  userRole = this._authService.userRoles
  links = [
    {url: 'users', name: 'users'},
  ]

  constructor(
    private _authService: AuthService,
  ) {}
}
