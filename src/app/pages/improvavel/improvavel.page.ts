import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-improvavel',
  templateUrl: './improvavel.page.html',
  styleUrls: ['./improvavel.page.scss'],
})
export class ImprovavelPage implements OnInit {

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

  verNoticias() {
    //this.voltarClicked();
    this.router.navigateByUrl('/tabs/noticias');
  
}
}
