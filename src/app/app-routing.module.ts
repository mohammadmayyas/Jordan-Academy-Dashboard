import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
