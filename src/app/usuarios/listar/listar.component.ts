import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';


export interface IUsuario {
  id: string;
  name: string;
  document: string;
  graduation: string;
  created_at: string;
  photo_url: string;
}



@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, MatModule, MatPaginatorModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements OnInit, AfterViewInit {
  readonly router = inject(Router)
  readonly usersService = inject(UsuariosService)
  readonly sweetalertService = inject(SweetalertService)
  readonly http = inject(HttpClient)

  ELEMENT_DATA: IUsuario[]
  displayedColumns: string[] = ['photo_url', 'matricula', 'nome', 'cargo', 'criacao', 'actions'];
  dataSource = new MatTableDataSource<IUsuario>;
  lista_usuarios: IUsuario

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.usersService.getAllUser().subscribe(res => this.dataSource = res)
  }


  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Linhas por páginas'
    this.paginator._intl.nextPageLabel = 'Proxima página'
    this.paginator._intl.lastPageLabel = 'Última página'
    this.paginator._intl.firstPageLabel = 'Primeira página'
    this.paginator._intl.previousPageLabel = 'Voltar página'
    this.dataSource.paginator = this.paginator;
  }

  cadastrarUsuario() {
    this.router.navigateByUrl(`usuarios/cadastrar`)
  }

  onEditUser(value: number) {
    this.router.navigateByUrl(`usuarios/editar/${value}`)
  }

  onDeleteUser(value: number) {
    this.sweetalertService.confirmAlert('warning', 'Deletar usuário?', 'Deseja deletar o usuário?').subscribe(
      (res: any) => {
        if (res) {
          this.usersService.deleteUser(value).subscribe({
            error: (err: any) => {
              this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
            },
            complete: () => {
              this.sweetalertService.alert('success', 'sucesso', 'Usuário deletado!'),
                this.ngOnInit()
            }
          })
        }
      }
    )
  }
}
