import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenha',
  standalone: true,
  imports: [CommonModule, MatModule, FormsModule, ReactiveFormsModule],
  templateUrl: './resenha.component.html',
  styleUrl: './resenha.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class ResenhaComponent {
  readonly router = inject(Router)
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) { }
  ngOnInit() {
    this._locale = 'pt-BR';
    this._adapter.setLocale(this._locale);
  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;

  botaoVoltar() {
    this.router.navigateByUrl('/animais')
  }

}
