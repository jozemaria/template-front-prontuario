import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cadastrar',
        component: CadastrarComponent,
        data: {
          title: 'elements'
        }
      }
    ]
  }, {
    path: '',
    children: [
      {
        path: 'listar',
        component: ListarComponent,
        data: {
          title: 'layouts'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
