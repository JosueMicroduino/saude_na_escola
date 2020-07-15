import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from 'src/app/user.module';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from 'src/app/user.service';
import { AlertController } from '@ionic/angular';
import { getuid } from 'process';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase/app';
import { build$ } from 'protractor/built/element';

@Component({
  selector: 'app-saude',
  templateUrl: './saude.page.html',
  styleUrls: ['./saude.page.scss'],
  providers: [DatePipe],
})
export class SaudePage implements OnInit {

  myDate = new Date();

  constructor(  
    public alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    private user: UserService,
    private afstore: AngularFirestore,
    private afAuth: AngularFireAuth,
  
    
    ) { }

    quem: string;
    idade: number;
    sintomas: Array<string>;
    periodo: string;
    doencas:Array<string>;
    sinais: Array<string>;
    
    
    

  ngOnInit() {
  }


  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
    })
    await alert.present()
  }

  voltarClicked() {
    this.navCtrl.back();
  
  }


  saude(){
    const {quem,idade,sintomas,periodo,doencas,sinais,myDate } = this
    this.verificaPerguntasObrigatorias();
    const user = firebase.auth().currentUser;
    //const res = this.afAuth.currentUser
    const date = myDate
    this.afstore.doc(`questionario/${user.email}`).collection(`/${date}`).add({
      
      date,
      leitura:{
      user: user.uid,
      quem,
      idade,
      sintomas,
      periodo,
      doencas,
      sinais
      }
    })

    
    if (sintomas.includes('nenhum_sintoma')){
      this.router.navigateByUrl('/improvavel')
    }
    else if (sintomas.includes('febre') && sintomas.includes('falta_ar')) {
      this.router.navigateByUrl('/atendimento');
    }
    else if (sintomas.includes('febre') && (sintomas.includes('dor_garganta') || sintomas.includes('tosse'))){
    if (idade>60){
      if (sinais.includes('nenhum_sinal')){
        this.router.navigateByUrl('/suspeito');
      }
      else{
        this.router.navigateByUrl('/improvavel');
      } 
    } else if (sinais==[]){
      this.router.navigateByUrl('/atendimento')
    } else{
      this.router.navigateByUrl('/suspeito')
    }
    } else{
      this.router.navigateByUrl('/improvavel')

    }
  }

  private verificaPerguntasObrigatorias() {
    const {quem,idade,sintomas,periodo,doencas,sinais } = this
    if (quem =="" || idade == null || sintomas == [] || periodo== "" || doencas == [] || sinais == []) {
      this.presentAlert('Erro!', 'Todos os campos são obrigatórios!')
    }
  }
  
}
