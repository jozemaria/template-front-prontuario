import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimaisComponent } from './animais.component';
import { ResenhaComponent } from './resenha/resenha.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';

const routes: Routes = [
  {
    path: '', component: AnimaisComponent
  },
  {
    path: 'resenha', component: ResenhaComponent
  },
  {
    path: 'prontuario', component: ProntuarioComponent
  },
  {
    path: 'prontuario/:id', component: ProntuarioComponent
  },
  {
    path: 'resenha/:id', component: ResenhaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
