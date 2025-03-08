import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { FileSizePipe } from 'src/app/shared/pipe/file-size.pipe';
import imageCompression from 'browser-image-compression'


@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, MatModule, ReactiveFormsModule, FileSizePipe],
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
  testeFoto: {}

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
    this.location.back()
  }

  save() {
    const formData = new FormData();

    Object.keys(this.userForm.controls).forEach(key => {
      formData.append(key, this.userForm.get(key)?.value);
    });

    formData.append('photo', this.selectedFile, this.selectedFile.name);

    const userData = {
      "user": { ...this.userForm.value }
    }
    if (this.idUser) {
      this.updateUser(formData)
    } else {
      this.saveUser(userData)
    }
  }
  listarUsuarios() {
    this.router.navigateByUrl('/usuarios/listar')
  }

  updateUser(valueUser: any) {
    console.log(valueUser, ` << UPDATE`)
    return this.usersService.updateUser(this.idUser, valueUser).subscribe({
      next: (res: any) => console.log(res.user, `<< resposta usuarioß`),
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
    console.log(valueUser, ` << NEW USER`)
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


  async onFileSelected(event: any) {

    const file: File = event.target.files[0];
    this.selectedFile = file

    //   if (file) {
    //     // Verifica o tamanho do arquivo (2MB = 2 * 1024 * 1024 bytes)
    //     if (file.size > 2 * 1024 * 1024) {
    //       // this.snackBar.open('A imagem não pode ser maior que 2MB.', 'Fechar', {
    //       //   duration: 3000,
    //       // });
    //       this.selectedFile = null;
    //       return;
    //     }

    //     // Verifica se o arquivo é uma imagem
    //     if (!file.type.startsWith('image/')) {
    //       // this.snackBar.open('Por favor, selecione um arquivo de imagem.', 'Fechar', {
    //       //   duration: 3000,
    //       // });
    //       this.selectedFile = null;
    //       return;
    //     }

    //     // this.snackBar.open('Imagem selecionada com sucesso!', 'Fechar', {
    //     //   duration: 2000,
    //     // });
    //   }
  }

}
