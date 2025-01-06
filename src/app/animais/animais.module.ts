import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { MatModule } from '../appModules/mat.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnimaisRoutingModule,
    MatModule
  ]
})
export class AnimaisModule { }
