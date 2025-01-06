/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
  .catch(err => console.error(err));
