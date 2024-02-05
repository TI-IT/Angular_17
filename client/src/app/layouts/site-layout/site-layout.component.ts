import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {AuthService} from "../../services/auth.service";
import {UiService} from "../../services/ui.service.service";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {AsyncPipe} from "@angular/common";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    MatIcon,
    MatToolbar,
    MatSidenavContent,
    MatNavList,
    MatSidenav,
    AsyncPipe,
    MatListItem,
    MatAnchor,
    MatIconButton,
    MatSidenavContainer
  ],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss'
})
export class SiteLayoutComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  userRoles = this._auth.userRoles

  links = [
    {url: '/products', name: 'Товары'},
    {url: '/clients', name: 'Клиенты'},
    {url: '/applications', name: 'Заявки'},
    // {url: '/overview', name: 'Обзор'},
    // {url: '/analytics', name: 'Аналитика'},
    // {url: '/history', name: 'История'},
    {url: '/order', name: 'Коммерческое предложение'},
    {url: '/specification', name: 'Спецификации'},
    // {url: '/categories', name: 'Ассортимент'},
  ]
  constructor(
    private _auth: AuthService,
    private _uiService: UiService,
    private _router: Router,
  ) {
  }

  onSidenavSet(drawer: MatSidenav) {
    this._uiService.drawer = drawer;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this._auth.loadTokenAndRoles();
  }

  logout(event: Event){
    event.preventDefault()
    this._auth.logout()
    this._router.navigate(['/login'])
  }

}


