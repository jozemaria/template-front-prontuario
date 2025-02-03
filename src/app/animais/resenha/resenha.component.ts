import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { AnimaisService } from '../service/animais.service';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

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
  imports: [CommonModule, MatModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './resenha.component.html',
  styleUrl: './resenha.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class ResenhaComponent {
  readonly router = inject(Router)
  readonly http = inject(HttpClient)
  readonly animaisService = inject(AnimaisService)
  readonly sweetalertService = inject(SweetalertService)

  matcher = new MyErrorStateMatcher();

  baias: Array<IBaias>
  isLinear = false;

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }

  ngOnInit() {
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
  });

  botaoVoltar() {
    this.router.navigateByUrl('/animais')
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
    // if (this.idUser) {
    //   this.updateUser(userData)
    // } else {
    this.saveHorse(dataToSend)
    // }
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

  resetForm() {
    this.horse_owner_attributes.reset()
    this.horse.reset()
  }

  prepareDataForApi(horseForm: any, horseOwnerForm: any) {
    return {
      horse: {
        name: horseForm.get('name')?.value,
        registration: horseForm.get('registration')?.value,
        weight: horseForm.get('weight')?.value,
        kind: horseForm.get('kind')?.value,
        gender: horseForm.get('gender')?.value,
        identification: horseForm.get('identification')?.value,
        hair: horseForm.get('hair')?.value,
        birthday: horseForm.get('birthday')?.value,
        father: horseForm.get('father')?.value,
        mother: horseForm.get('mother')?.value,
        description: horseForm.get('description')?.value,
        baia_id: horseForm.get('baia_id')?.value.toString(),
        horse_owner_attributes: {
          name: horseOwnerForm.get('name')?.value,
          document: horseOwnerForm.get('document')?.value,
          cep: horseOwnerForm.get('cep')?.value,
          street: horseOwnerForm.get('street')?.value,
          number: horseOwnerForm.get('number')?.value,
          city: horseOwnerForm.get('city')?.value,
          state: horseOwnerForm.get('state')?.value,
          district: horseOwnerForm.get('district')?.value
        }
      }
    };
  }

}
