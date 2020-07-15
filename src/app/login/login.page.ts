import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Injectable,Inject } from '@angular/core';
import { FirebaseApp,} from '@angular/fire/';
import { User} from '../user.module';
import { tokenName } from '@angular/compiler';

//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  	useremail: string = ""
  
	password: string = ""

	//token: string

	constructor(
		public afAuth: AngularFireAuth, 
		public user: UserService, 
		public router: Router,
		public alertController: AlertController,
		public auth: AuthService
		) { }

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

	async login() {
		const { useremail, password } = this
		
		this.afAuth.fetchSignInMethodsForEmail(useremail)
		.then(providers=>{
			if (providers.length ==0){
				this.presentAlert('Erro!', 'Este e-mail não está cadastrado!')	
			}
		})

		try { 
			const res = await this.afAuth.signInWithEmailAndPassword(useremail, password)
			const token =  this.auth.GetToken(res.user)
			localStorage.setItem('token',token)
			if(res.user) {
				this.user.setUser({
					useremail,
					uid: res.user.uid
					
				})
				this.router.navigate(['/tabs/inicio'])

				//await this.afAuth.getIdToken(true)
				//.then((token) => localStorage.setItem('tokenId', token))
				//localStorage.setItem('token', token);
				//this.auth.setLoggedIn(true)
			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
		}
	}

	async register() {
			this.router.navigate(['/register'])
	}
}