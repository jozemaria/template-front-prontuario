import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent implements OnInit {
  readonly route = inject(ActivatedRoute)
  readonly router = inject(Router)
  readonly usersService = inject(UsuariosService)
  readonly sweetalertService = inject(SweetalertService)

  titulo = this.route.snapshot.paramMap.get('id') === null ? 'Cadastrar usuário' : 'Editar usuário'
  subtitulopage = this.route.snapshot.paramMap.get('id') === null
    ? 'Cadastro de novo usuário usuário.'
    : 'Edição de usuário.'
  idUser: number

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    registration: new FormControl(''),
    cell_fone: new FormControl(''),
    password: new FormControl(''),
    crm: new FormControl(''),
    graduation: new FormControl(''),
    role: new FormControl(''),
  });
  hide = true;

  ngOnInit() {
    this.idUser = parseInt(this.route.snapshot.paramMap.get('id'))
    this.loadUserIntoForm()
  }


  botaoVoltar() {
    this.router.navigateByUrl('usuarios/listar')
  }

  save() {
    const userData = { "user": this.userForm.value }
    if (this.idUser) {
      this.updateUser(userData)
    } else {
      this.saveUser(userData)
    }
  }
  listarUsuarios() {
    this.router.navigateByUrl('/usuarios/listar')
  }

  updateUser(newUser: any) {
    return this.usersService.updateUser(this.idUser, newUser).subscribe({
      next: (res: any) => console.log(res.user),
      error: (err: any) => {
        this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
      },
      complete: () => {
        this.sweetalertService.alert('success', 'Sucesso!', 'Usuário atualizado.')
        this.listarUsuarios()
      }
    })
  }

  saveUser(newUser: any) {
    return this.usersService.saveNewUser(newUser).subscribe({
      next: () => this.listarUsuarios(),
      error: (err: any) => {
        this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
      },
      complete: () => {
        this.sweetalertService.alert('success', 'Sucesso!', 'Novo usuário cadastrado.')
        this.resetForm()
      }
    })
  }

  loadUserIntoForm() {
    if (this.idUser) {
      this.usersService.getUserById(this.idUser).subscribe(
        (res: any) => {
          this.userForm.patchValue({
            name: res.name,
            email: res.email,
            registration: res.registration,
            cell_fone: res.cell_fone,
            crm: res.crm,
            graduation: res.graduation,
            role: res.role,
          })
        })
    }
  }

  resetForm() {
    return this.userForm.reset()
  }
}
