import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SemConexaoPage } from '../sem-conexao/sem-conexao.page';
import { Network } from '@ionic-native/network/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AtendimentoPreClinicoPage } from '../atendimento-pre-clinico/atendimento-pre-clinico.page';
import { AtendimentoPreClinicoService } from '../../services/atendimento-pre-clinico.service';
import { IonTabs } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  //@ViewChild('tabs',{static: false}) tabs: IonTabs

  language: any;

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router,
    public auth: AuthService,
    private translate: TranslateService,
    private storage: StorageService,
    private statusBar: StatusBar,
    private network: Network,
    private modalCtrl: ModalController,
    private plt: Platform,
    private atendimentoPreClinicoService: AtendimentoPreClinicoService
  ) {
    this.network.onDisconnect().subscribe(async () => {
      const modal = await this.modalCtrl.create({
        component: SemConexaoPage,
        cssClass: 'modal-sem-conexao'
      });
      await modal.present();
    });
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE).subscribe((value) => {
      this.translate.setDefaultLang(value);
    });
  }

  ionViewWillEnter() {
    if (this.plt.is('ios')) {
      this.statusBar.styleLightContent();
    }
  }

  ionViewWillLeave() {
    if (this.plt.is('ios')) {
      this.statusBar.styleDefault();
    }
  }

  async ngOnInit() {
    ///this.tabs.select('inicio')
    if (this.storage.get('ATENDIMENTO_PRE_CLINICO')) {
      const modal = await this.modalCtrl.create({
        component: AtendimentoPreClinicoPage,
        cssClass: 'modal-atendimento-pre-clinico',
        componentProps: {
          showPreClinico: true
        }
      });
      await modal.present();
      const atendimento = await modal.onDidDismiss();
      if (atendimento.data) {
        await this.atendimentoPreClinicoService.salvar(atendimento.data, true);
        await this.storage.set('ATENDIMENTO_PRE_CLINICO', false);
      }
    }
    this.language = this.storage.get('LANGUAGE') ? this.storage.get('LANGUAGE') : 'pt-BR';
    this.translate.setDefaultLang(this.language);
  }

  async Logout(){
    this.afAuth.signOut().then(() => {
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
    });
    
  }

  async idiomaSelected(value) {
    this.language = value;
    this.translate.setDefaultLang( this.language );
    await this.storage.set( 'LANGUAGE', this.language );
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE_TAB).emit(value);
  }
}
