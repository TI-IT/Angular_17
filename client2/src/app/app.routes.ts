import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {
    path: '', component: SiteLayoutComponent,
    canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'analytics', component: AnalyticsComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'categories', component: CategoriesComponent},
      {
        path: 'products',
        // canMatch: ['roleManagerGuard'],
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'order',
        canMatch: ['roleManagerGuard'],
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'specification',
        canMatch: ['roleManagerGuard'],
        loadChildren: () => import('./specifications/specifications.module').then(m => m.SpecificationsModule)
      },
      {
        path: 'clients',
        canMatch: ['roleManagerGuard'],
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'admin',
        canMatch: ['roleAdminGuard'],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },

      {
        path: 'applications',
        canMatch: ['roleManagerGuard'],
        loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule)
      },
      {path: 'supply', loadChildren: () => import('./supply/supply.module').then(m => m.SupplyModule)},
      {
        path: 'google-sheets',
        loadChildren: () => import('./google-sheets/google-sheets.module').then(m => m.GoogleSheetsModule)
      },
      {path: '404', component: ErrorComponent},
      {path: '**', redirectTo: '404'},
    ]
  }
];
