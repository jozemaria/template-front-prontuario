import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MatModule } from '../appModules/mat.module';


@NgModule({
  declarations: [
    AnalyticsComponent, 
    ECommerceComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatModule
  ]
})
export class DashboardModule { }
