import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-suspeito',
  templateUrl: './suspeito.page.html',
  styleUrls: ['./suspeito.page.scss'],
})
export class SuspeitoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  voltarClicked() {
    this.router.navigateByUrl('/tabs/inicio');
    //this.navCtrl.back();
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

