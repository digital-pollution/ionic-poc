import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormControlsPageRoutingModule } from './form-controls-routing.module';

import { FormControlsPage } from './form-controls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormControlsPageRoutingModule
  ],
  declarations: [FormControlsPage]
})
export class FormControlsPageModule {}
