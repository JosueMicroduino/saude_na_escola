import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DicaDetalheFakenewsPage } from '../dica-detalhe-fakenews/dica-detalhe-fakenews.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [DicaDetalheFakenewsPage],
  exports: [DicaDetalheFakenewsPage],
  entryComponents: [DicaDetalheFakenewsPage]
})
export class DicaDetalheFakenewsPageModule {}
