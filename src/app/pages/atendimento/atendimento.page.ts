import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  voltarClicked() {
    this.router.navigateByUrl('/tabs/inicio');
  
  }

  verDicas() {
    //this.voltarClicked();
    this.router.navigateByUrl('/tabs/dicas');
  }
  encontre() {
    this.router.navigateByUrl('/mapa');
    //this.voltarClicked();
  }
}
