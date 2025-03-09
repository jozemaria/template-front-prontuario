import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { FileSizePipe } from 'src/app/shared/pipe/file-size.pipe';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule, FileSizePipe, NgxMaskDirective],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent implements OnInit {
  readonly route = inject(ActivatedRoute)
  readonly router = inject(Router)
  readonly usersService = inject(UsuariosService)
  readonly sweetalertService = inject(SweetalertService)
  readonly location = inject(Location)

  titulo = this.route.snapshot.paramMap.get('id') === null ? 'Cadastrar' : 'Editar'
  subtitulopage = this.route.snapshot.paramMap.get('id') === null
    ? 'Cadastro de novo usuário.'
    : 'Edição de usuário.'
  idUser: number
  selectedFile: File | null = null;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    registration: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(7)]),
    crm: new FormControl(''),
    graduation: new FormControl('', [Validators.required]),
    role: new FormControl(''),
  });
  hide = true;

  ngOnInit() {
    this.idUser = parseInt(this.route.snapshot.paramMap.get('id'))
    this.loadUserIntoForm()
  }


  botaoVoltar() {
    this.location.back()
  }

  save() {
    const formData = new FormData();
    Object.keys(this.userForm.controls).forEach(key => {
      formData.append(`user[${key}]`, this.userForm.get(key)?.value);
    });
    if (this.selectedFile) formData.append('user[photo]', this.selectedFile, this.selectedFile.name);

    if (this.idUser) {
      this.updateUser(formData)
    } else {
      this.saveUser(formData)
    }
  }
  listarUsuarios() {
    this.router.navigateByUrl('/usuarios/listar')
  }

  updateUser(valueUser: any) {
    return this.usersService.updateUser(this.idUser, valueUser).subscribe({
      error: (err: any) => {
        this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
      },
      complete: () => {
        this.sweetalertService.alert('success', 'Sucesso!', 'Usuário atualizado.')
        this.listarUsuarios()
      }
    })
  }

  saveUser(valueUser: any) {
    return this.usersService.saveNewUser(valueUser).subscribe({
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
            phone: res.phone,
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


  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.sweetalertService.alert('warning', 'Atenção', 'A imagem não pode ser maior que 2MB.')
        this.selectedFile = null;
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.sweetalertService.alert('warning', 'Atenção', 'Por favor, selecione um arquivo de imagem.')
        this.selectedFile = null;
        return;
      }
    }
    this.selectedFile = file
  }

}
