import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
//import { setupMaster } from 'cluster';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	filho: string = ""
	escola: string = ""
	useremail: string = ""
	password: string = ""
	cpassword: string = ""

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router,
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

	async register() {
		const { useremail, password, cpassword, username, filho, escola } = this
		if(password !== cpassword) {
			this.presentAlert('Erro!', 'As senhas não são iguais!')
			return console.error("As senhas não são iguais!")
		}
		if(useremail==''|| password=="" || cpassword=="" || username=="" || filho=="" || escola=="") {
			this.presentAlert('Erro!', 'Todos os campos são obrigatórios!')
		}
		
		this.afAuth.fetchSignInMethodsForEmail(useremail)
		.then(providers=>{
			if (providers.length !=0){
				this.presentAlert('Erro!', 'Este e-mail já está sendo utilizado!')	
			}

		})
		try {
			const res = await this.afAuth.createUserWithEmailAndPassword(useremail, password)
			this.afstore.doc(`users/${res.user.uid}`).set({
				useremail,
				uid: res.user.uid,
				username,
				filho, 
				escola,

			})
			if(res.user) {
				this.user.setUser({
					useremail,
					uid: res.user.uid
					})
					this.presentAlert('Secesso!', 'Você está registrado!')
					this.router.navigate(['/tabs/inicio'])

				}

		} catch(error) {
			console.dir(error)
		}
	}

}