import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
