import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IdiomasComponentModule } from '../../components/idiomas/idiomas.module';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { SemConexaoPageModule } from '../sem-conexao/sem-conexao.module';
import { AtendimentoPreClinicoPageModule } from '../atendimento-pre-clinico/atendimento-pre-clinico.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabsPageRoutingModule,
    IdiomasComponentModule,
    SemConexaoPageModule,
    AtendimentoPreClinicoPageModule,
    //RouterModule.forChild([{ path: '', component: TabsPage}]), 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
