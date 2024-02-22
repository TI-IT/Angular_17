import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
    if (typeof localStorage !== 'undefined') {
      const potentialToken  = localStorage.getItem('auth-token')
      if(potentialToken !== null) {
        console.log('AppComponent-ngOnInit-localStorage')
        this._auth.setToken(potentialToken)
      }
    } else {
      console.log('AppComponent-ngOnInit-ERROR')
      // Handle the case where localStorage is not available
    }
  }
}
