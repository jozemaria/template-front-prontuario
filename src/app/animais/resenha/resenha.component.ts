import { forkJoin } from 'rxjs';
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

export interface IHorseImageAnnotation {
  id: number,
  x: number,
  y: number,
  note: string,
  created_at: string
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
  selectedFileCover: File | null = null;
  horseImageAnnotations: IHorseImageAnnotation[] = [];
  hasServerAnnotations = false;
  horseImagePreviewUrl: string | null = 'assets/images/resenha/Imagem_Cavalo_Informacoes.png';
  selectedAnnotationPoint: { x: number; y: number } | null = null;
  currentAnnotationText = '';

  maxDate: Date;

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
  ) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.animaisService.baiasCadastradas.subscribe((res: any) => this.baias = res)
    this.idResenha = parseInt(this.route.snapshot.paramMap.get('id'))
    this._locale = 'pt-BR';
    this._adapter.setLocale(this._locale);
    this.loadHorseIntoForm()
  }

  private readonly annotationStoragePrefix = 'horse-image-annotations';

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
    registation: ['', Validators.required],
    weight: ['', Validators.required],
    kind: ['', Validators.required],
    breed: ['', Validators.required],
    gender: ['', Validators.required],
    identification: ['', Validators.required],
    hair: ['', Validators.required],
    birthday: ['', Validators.required],
    father: ['', Validators.required],
    mother: ['', Validators.required],
    description: ['', Validators.required],
    baia: ['', Validators.required],
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

  private getAnnotationStorageKey(): string {
    const horseId = this.idResenha ? this.idResenha.toString() : 'draft';
    return `${this.annotationStoragePrefix}:${horseId}`;
  }

  private persistAnnotations(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(this.getAnnotationStorageKey(), JSON.stringify(this.horseImageAnnotations));
  }

  private restoreAnnotations(annotations: any): void {
    if (!annotations) {
      const storageAnnotations = window.localStorage.getItem(this.getAnnotationStorageKey());
      if (storageAnnotations) {
        this.horseImageAnnotations = JSON.parse(storageAnnotations);
      }
      return;
    }

    this.horseImageAnnotations = Array.isArray(annotations) ? annotations : JSON.parse(annotations);
    this.persistAnnotations();
  }

  private clearStoredAnnotations(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(this.getAnnotationStorageKey());
  }

  private normalizeImageAnnotations(value: any): IHorseImageAnnotation[] {
    if (Array.isArray(value)) {
      return value as IHorseImageAnnotation[];
    }

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed as IHorseImageAnnotation[] : [];
      } catch {
        return [];
      }
    }

    return [];
  }

  private getReviewImageUrlFromResponse(response: any): string | null {
    const candidates = [
      response?.horse?.review_image_url,
      response?.review_image_url,
      response?.horse?.review_image,
      response?.review_image,
      response?.horse?.image_url,
      response?.image_url,
    ];

    const value = candidates.find(candidate => typeof candidate === 'string' && candidate.trim() !== '');
    return typeof value === 'string' ? value : null;
  }

  loadHorseIntoForm() {
    if (this.idResenha) {
      forkJoin({
        horse: this.animaisService.getAnimalById(this.idResenha),
        baias: this.animaisService.baiasCadastradas
      }).subscribe(({ horse: res, baias: baiasList }: { horse: any; baias: any }) => {
        this.baias = baiasList
          Object.keys(this.horse_owner_attributes.controls).forEach(key => {
            if (res.owner[key] !== undefined) {
              this.horse_owner_attributes.get(key)?.patchValue(res.owner[key])
            }
          })
          Object.keys(this.horse.controls).forEach(key => {
            console.log(res, ' << RES')
            if (res[key] !== undefined) {
              if (key === 'birthday') {
                const dateValue = new Date(res[key])
                if (!isNaN(dateValue.getTime())) {
                  this.horse.get(key)?.patchValue(dateValue as any)
                }
              } else if (key === 'baia') {
                let baiaValue = res[key] || res.horse?.[key] || res['baia_id']
                if (typeof baiaValue === 'string') {
                  const match = baiaValue.match(/\d+/)
                  baiaValue = match ? Number(match[0]) : null
                } else if (baiaValue && typeof baiaValue === 'object' && baiaValue.id !== undefined) {
                  baiaValue = baiaValue.id
                }
                this.horse.get(key)?.patchValue(baiaValue)
              } else {
                this.horse.get(key)?.patchValue(res[key])
              }
            }
          })

          const serverAnnotations = this.normalizeImageAnnotations(res?.horse?.image_annotations || res?.image_annotations);
          this.hasServerAnnotations = serverAnnotations.length > 0;
          if (serverAnnotations.length) {
            this.horseImageAnnotations = serverAnnotations;
            this.persistAnnotations();
          } else {
            this.restoreAnnotations(null);
          }

          const serverReviewImageUrl = this.getReviewImageUrlFromResponse(res);
          if (serverReviewImageUrl) {
            this.horseImagePreviewUrl = serverReviewImageUrl;
          } else if (res?.horse?.photo_url && !this.horseImagePreviewUrl) {
            this.horseImagePreviewUrl = res.horse.photo_url;
          }
        })
    } else {
      this.restoreAnnotations(null);
    }
  }

  handleImageClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    this.selectedAnnotationPoint = { x, y };
    this.currentAnnotationText = '';
  }

  saveAnnotation(): void {
    if (!this.selectedAnnotationPoint) {
      this.sweetalertService.alert('warning', 'Atenção', 'Selecione um ponto na imagem antes de salvar a observação.');
      return;
    }

    const note = this.currentAnnotationText.trim();
    if (!note) {
      this.sweetalertService.alert('warning', 'Atenção', 'Escreva a observação para salvar o ponto na imagem.');
      return;
    }

    this.horseImageAnnotations = [
      ...this.horseImageAnnotations,
      {
        id: Date.now(),
        x: this.selectedAnnotationPoint.x,
        y: this.selectedAnnotationPoint.y,
        note,
        created_at: new Date().toISOString()
      }
    ];
    this.selectedAnnotationPoint = null;
    this.currentAnnotationText = '';
    this.persistAnnotations();

    if (this.idResenha) {
      this.animaisService.saveImageAnnotations(this.idResenha, this.horseImageAnnotations).subscribe({
        next: () => {
          this.hasServerAnnotations = true;
        },
        error: (err: any) => {
          this.sweetalertService.alert('error', 'Ops...', 'Erro ao salvar observação: ' + (err.error?.[0] || err.message));
        }
      });
    }
  }

  removeAnnotation(annotationId: number): void {
    if (this.idResenha && this.hasServerAnnotations) {
      this.animaisService.deleteImageAnnotation(this.idResenha, annotationId).subscribe({
        next: () => {
          this.horseImageAnnotations = this.horseImageAnnotations.filter(annotation => annotation.id !== annotationId);
          this.persistAnnotations();
        },
        error: (err: any) => {
          this.sweetalertService.alert('error', 'Ops...', 'Erro ao excluir observação: ' + (err.error?.[0] || err.message));
        }
      });
    } else {
      this.horseImageAnnotations = this.horseImageAnnotations.filter(annotation => annotation.id !== annotationId);
      this.persistAnnotations();
    }
  }

  clearPendingAnnotation(): void {
    this.selectedAnnotationPoint = null;
    this.currentAnnotationText = '';
  }

  prepareDataForApi(horseForm: any, horseOwnerForm: any) {
    const formData = new FormData();

    Object.keys(horseForm.controls).forEach(key => {
      const value = horseForm.get(key)?.value;
      if (value !== null && value !== undefined && value !== '') {
        formData.append(`horse[${key}]`, value);
      }
    });

    if (this.selectedFile) {
      formData.append('horse[photo]', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFileCover) {
      formData.append('horse[cover]', this.selectedFileCover, this.selectedFileCover.name);
    }
    if (!this.idResenha) {
      if (this.horseImageAnnotations.length > 0) {
        formData.append('horse[image_annotations]', JSON.stringify(this.horseImageAnnotations));
      } else {
        formData.append('horse[image_annotations]', JSON.stringify([]));
      }
    }

    Object.keys(horseOwnerForm.controls).forEach(key => {
      const value = horseOwnerForm.get(key)?.value;
      if (value !== null && value !== undefined && value !== '') {
        formData.append(`horse[horse_owner_attributes][${key}]`, value);
      }
    });

    return formData;
  }

  async onFileSelected(event: any, type: string) {
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
    if (type === 'capa') this.selectedFileCover = file
    if (type === 'perfil') {
      this.selectedFile = file
    }
  }

  resetForm() {
    this.horse_owner_attributes.reset()
    this.horse.reset()
    this.horseImageAnnotations = []
    this.hasServerAnnotations = false
    this.selectedAnnotationPoint = null
    this.currentAnnotationText = ''
    this.horseImagePreviewUrl = 'assets/images/resenha/Imagem_Cavalo_Informacoes.png'
    this.clearStoredAnnotations()
  }

}
