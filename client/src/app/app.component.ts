import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  constructor(
    private _auth: AuthService,
  ) {
  }

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if(potentialToken !== null) {
      this._auth.setToken(potentialToken)
    }
  }
}
