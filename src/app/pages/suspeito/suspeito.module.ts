import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuspeitoPageRoutingModule } from './suspeito-routing.module';

import { SuspeitoPage } from './suspeito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuspeitoPageRoutingModule
  ],
  declarations: [SuspeitoPage]
})
export class SuspeitoPageModule {}
