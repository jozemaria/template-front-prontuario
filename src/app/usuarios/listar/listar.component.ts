import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';


export interface PeriodicElement {
  nome: string;
  matricula: number;
  cargo: string;
  criacao: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { matricula: 165, nome: 'Hydrogen', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 223, nome: 'Helium', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 346, nome: 'Lithium', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 465, nome: 'Beryllium', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 549, nome: 'Boron', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 613, nome: 'Carbon', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 716, nome: 'Nitrogen', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 812, nome: 'Oxygen', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 912, nome: 'Fluorine', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 104, nome: 'Neon', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 115, nome: 'Sodium', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 126, nome: 'Magnesium', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 132, nome: 'Aluminum', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 143, nome: 'Silicon', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 153, nome: 'Phosphorus', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 161, nome: 'Sulfur', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 174, nome: 'Chlorine', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 187, nome: 'Argon', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 199, nome: 'Potassium', cargo: 'Soldado', criacao: '25/04/2024' },
  { matricula: 208, nome: 'Calcium', cargo: 'Soldado', criacao: '25/04/2024' },
];

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, MatModule, MatPaginatorModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements AfterViewInit {
  readonly router = inject(Router)
  displayedColumns: string[] = ['matricula', 'nome', 'cargo', 'criacao', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Linhas por páginas'
    this.paginator._intl.nextPageLabel = 'Proxima página'
    this.paginator._intl.lastPageLabel = 'Última página'
    this.paginator._intl.firstPageLabel = 'Primeira página'
    this.paginator._intl.previousPageLabel = 'Voltar página'
    this.dataSource.paginator = this.paginator;
  }

  editarUsuario() {
    this.router.navigateByUrl('usuarios/cadastrar')
  }
}
