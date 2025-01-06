import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { GeralComponent } from './geral/geral.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'e-commerce',
        component: ECommerceComponent,
        data: {
          title: 'e-Commerce'
        }
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
      {
        path: 'geral',
        component: GeralComponent,
        data: {
          title: 'Geral'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
