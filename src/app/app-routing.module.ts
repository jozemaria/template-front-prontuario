import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/geral',
    pathMatch: 'full',
  },
  {
    path: '', component: FullLayoutComponent,
    data: { title: 'full Views' }, children: Full_ROUTES,
    canActivate: [authGuard]
  },
  {
    path: '', component: ContentLayoutComponent,
    data: { title: 'content Views' }, children: CONTENT_ROUTES,
  },
  {
    path: '**', redirectTo: 'dashboard/geral',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
