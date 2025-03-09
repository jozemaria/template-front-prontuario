import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimaisService } from '../service/animais.service';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { FileSizePipe } from 'src/app/shared/pipe/file-size.pipe';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface IBaias {
  id: number,
  name: string,
  created_at: string,
  updated_at: string
}

@Component({
  selector: 'app-resenha',
  standalone: true,
  imports: [CommonModule, MatModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, FileSizePipe],
  templateUrl: './resenha.component.html',
  styleUrl: './resenha.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class ResenhaComponent implements OnInit {
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute)
  readonly http = inject(HttpClient)
  readonly animaisService = inject(AnimaisService)
  readonly sweetalertService = inject(SweetalertService)
  readonly location = inject(Location)

  matcher = new MyErrorStateMatcher();
  selectedFile: File | null = null;

  titulo = this.route.snapshot.paramMap.get('id') === null ? 'Cadastrar Resenha' : 'Editar Resenha'
  subtitulopage = this.route.snapshot.paramMap.get('id') === null
    ? 'Cadastro de nova resenha.'
    : 'Edição de resenha.'

  baias: Array<IBaias>
  isLinear = false
  idResenha: number

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  ngOnInit() {
    this.idResenha = parseInt(this.route.snapshot.paramMap.get('id'))
    this._locale = 'pt-BR';
    this._adapter.setLocale(this._locale);
    this.animaisService.baiasCadastradas.subscribe((res: any) => this.baias = res)
  }

  private _formBuilder = inject(FormBuilder);

  horse_owner_attributes = this._formBuilder.group({
    name: ['', Validators.required],
    cep: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    district: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
  });
  horse = this._formBuilder.group({
    name: ['', Validators.required],
    registration: ['', Validators.required],
    weight: ['', Validators.required],
    kind: ['', Validators.required],
    gender: ['', Validators.required],
    identification: ['', Validators.required],
    hair: ['', Validators.required],
    birthday: ['', Validators.required],
    father: ['', Validators.required],
    mother: ['', Validators.required],
    description: ['', Validators.required],
    baia_id: ['', Validators.required],
    tombamento: ['', Validators.required],
  });

  botaoVoltar() {
    this.location.back()
  }

  populaDadosForm(dados) {
    this.horse_owner_attributes.patchValue({
      street: dados.logradouro,
      number: dados.complemento,
      district: dados.bairro,
      city: dados.localidade,
      state: dados.uf,
    });
  }

  consultaCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados));
      }

    }
  }

  save() {
    const dataToSend = this.prepareDataForApi(this.horse, this.horse_owner_attributes)
    if (this.idResenha) {
      this.updateResenha(dataToSend)
    } else {
      this.saveHorse(dataToSend)
    }
  }

  updateResenha(editResenha: any) {
    return this.animaisService.updateAnimal(this.idResenha, editResenha).subscribe({
      next: () => this.router.navigateByUrl('/animais'),
      error: (err: any) => {
        this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
      },
      complete: () => {
        this.sweetalertService.alert('success', 'Sucesso!', 'Resenha atualizada.')
        this.resetForm()
      }
    })
  }

  saveHorse(newHorse: any) {
    return this.animaisService.saveNewAnimal(newHorse).subscribe({
      next: () => this.router.navigateByUrl('/animais'),
      error: (err: any) => {
        this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error[0])
      },
      complete: () => {
        this.sweetalertService.alert('success', 'Sucesso!', 'Novo cavalo cadastrado.')
        this.resetForm()
      }
    })
  }

  loadUserIntoForm() {
    if (this.idResenha) {
      this.animaisService.getAnimalById(this.idResenha).subscribe(
        (res: any) => {
          console.log(res, `<< RES PUT`)
        })
    }
  }

  prepareDataForApi(horseForm: any, horseOwnerForm: any) {
    const formData = new FormData();

    // Adiciona os valores do horseForm ao FormData
    Object.keys(horseForm.controls).forEach(key => {
      const value = horseForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(`horse[${key}]`, value);
      }
    });

    // Adiciona a foto ao FormData, se existir
    if (this.selectedFile) {
      formData.append('horse[photo]', this.selectedFile, this.selectedFile.name);
    }

    // Adiciona os valores do horseOwnerForm ao FormData
    Object.keys(horseOwnerForm.controls).forEach(key => {
      const value = horseOwnerForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(`horse[horse_owner_attributes][${key}]`, value);
      }
    });

    return formData;
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

  resetForm() {
    this.horse_owner_attributes.reset()
    this.horse.reset()
  }

}
