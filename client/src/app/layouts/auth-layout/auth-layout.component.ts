import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterModule, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
