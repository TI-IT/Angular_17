import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {RegisterComponent} from "./pages/register/register.component";
import {SiteLayoutComponent} from "./layouts/site-layout/site-layout.component";
import {SpecificationComponent} from "./pages/crm/specification/specification.component";
import {SupplyComponent} from "./pages/crm/supply/supply.component";
import {ErrorComponent} from "./pages/error/error.component";
import {AddClientsComponent} from "./pages/crm/clients/add-clients/add-clients.component";
import {AllClientsComponent} from "./pages/crm/clients/all-clients/all-clients.component";
import {DetailClientComponent} from "./pages/crm/clients/detail-client/detail-client.component";
import {AllApplicationsComponent} from "./pages/crm/applications/all-applications/all-applications.component";
import {AddApplicationsComponent} from "./pages/crm/applications/add-applications/add-applications.component";
import {DetailApplicationsComponent} from "./pages/crm/applications/detail-applications/detail-applications.component";
import {AllProductsComponent} from "./pages/crm/products/all-products/all-products.component";
import {AdminLayoutComponent} from "./pages/crm/admin/admin-layout/admin-layout.component";
import {UsersListComponent} from "./pages/crm/users/users-list/users-list.component";
import {AddProductsComponent} from "./pages/crm/products/add-products/add-products.component";
import {DetailProductsComponent} from "./pages/crm/products/detail-products/detail-products.component";
import {AddOrderComponent} from "./pages/crm/order/add-order/add-order.component";
import {DetailOrderComponent} from "./pages/crm/order/detail-order/detail-order.component";
import {AllOrderComponent} from "./pages/crm/order/all-order/all-order.component";

const SiteLayoutAuthGuard = (): boolean => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('auth-token')
    if (token) {
      return true
    } else {
      window.alert('Доступ запрещен, для доступа к этой странице требуется вход в систему!');
      location.assign(window.location.protocol)
      return false
    }
  } else {
    return false
  }
  // if (!AuthService.isAuthenticated()) {
  //   // SnackBar
  //   window.alert('Доступ запрещен, для доступа к этой странице требуется вход в систему!');
  //
  //   Router.navigate(['login'], {
  //     queryParams: {
  //       accessDenied: true
  //     }
  //   }).then(r => return of(false))
  //
  // }
  // return of(true);
}


export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    // loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes)
    canActivate: [SiteLayoutAuthGuard], loadChildren: () => [
      {
        path: 'products',
        canMatch: ['roleManagerGuard'], component: AllProductsComponent
      },
      {
        path: 'products', children: [
          {path: 'add', component: AddProductsComponent},
          {path: 'detail/:id', component: DetailProductsComponent},
        ]
      },
      {
        path: 'order',
        canMatch: ['roleManagerGuard'], component: AllOrderComponent
      },
      {
        path: 'order', children: [
          {
            path: 'add', component: AddOrderComponent
          },
          {
            path: 'detail/:id', component: DetailOrderComponent
          },
        ]
      },
      {
        path: 'specification',
        canMatch: ['roleManagerGuard'], component: SpecificationComponent
      },
      {
        path: 'clients',
        canMatch: ['roleManagerGuard'], component: AllClientsComponent
      },
      {
        path: 'clients', children: [
          {
            path: 'add', component: AddClientsComponent
          },
          {
            path: 'detail/:id', component: DetailClientComponent
          },
        ]
      },
      {
        path: 'applications',
        canMatch: ['roleManagerGuard'], component: AllApplicationsComponent
      },
      {
        path: 'applications', children: [
          {
            path: 'add', component: AddApplicationsComponent
          },
          {
            path: 'detail/:id', component: DetailApplicationsComponent
          },
        ]
      },
      {
        path: 'admin',
        canMatch: ['roleAdminGuard'], component: AdminLayoutComponent
      },
      {
        path: 'admin', children: [
          {
            path: 'users', component: UsersListComponent
          }
        ]
      },
      {path: 'supply', component: SupplyComponent},

      {path: '404', component: ErrorComponent},
      {path: '**', redirectTo: '404'},
    ]
  }
];
