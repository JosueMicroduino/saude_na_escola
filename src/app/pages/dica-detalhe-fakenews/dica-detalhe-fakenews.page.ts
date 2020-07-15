import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-dica-detalhe-fakenews',
  templateUrl: './dica-detalhe-fakenews.page.html',
  styleUrls: ['./dica-detalhe-fakenews.page.scss'],
})
export class DicaDetalheFakenewsPage implements OnInit {

  dica: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.dica = this.navParams.get('dica');
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

}
