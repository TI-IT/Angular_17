import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private router: Router) {

  }

  logoff() {
    this.router.navigateByUrl('/login');
  }
}
