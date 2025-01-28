import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


export interface IUsuario {
  id: string;
  name: string;
  document: string;
  graduation: string;
  created_at: string;
}



@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, MatModule, MatPaginatorModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: IUsuario[]
  displayedColumns: string[] = ['matricula', 'nome', 'cargo', 'criacao', 'actions'];
  readonly router = inject(Router)
  dataSource = new MatTableDataSource<IUsuario>;
  lista_usuarios: IUsuario

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usuarioService: UsuariosService,
    private http: HttpClient) { }
  // IMPLANTAR LOADING E SWEETALERT
  // private router: Router,
  // private loadingService: LoadingService,
  // private sweetalertService: SweetalertService

  ngOnInit(): void {
    this.usuarioService.getAllUser().subscribe(res => this.dataSource = res)
  }


  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Linhas por páginas'
    this.paginator._intl.nextPageLabel = 'Proxima página'
    this.paginator._intl.lastPageLabel = 'Última página'
    this.paginator._intl.firstPageLabel = 'Primeira página'
    this.paginator._intl.previousPageLabel = 'Voltar página'
    this.dataSource.paginator = this.paginator;
  }


  onEditUser(value: number) {
    console.log(`value`, value)
    // this.router.navigateByUrl(`/usuario/editar/${value}`)
  }

  editarUsuario() {
    this.router.navigateByUrl('usuarios/cadastrar')
  }
}
