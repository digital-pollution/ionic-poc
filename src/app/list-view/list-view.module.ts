import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListViewPageRoutingModule } from './list-view-routing.module';

import { ListViewPage, ModalPage } from './list-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListViewPageRoutingModule
  ],
  declarations: [ListViewPage, ModalPage]
})
export class ListViewPageModule {}
