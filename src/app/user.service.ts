import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import * as firebase from 'firebase/app';
import { ɵangular_packages_router_router_n } from '@angular/router';


interface user {
	useremail: string,
	uid: string
}

@Injectable()
export class UserService {
	private user: user

	constructor(private afAuth: AngularFireAuth) {

	}

	setUser(user: user) {
		this.user = user
	}

	getUsername(): string {
		return this.user.useremail
	}

	async reAuth(useremail: string, password: string) {
        return await (await this.afAuth.currentUser).reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(useremail, password))
    }

	async updatePassword(newpassword: string) {
        return await (await this.afAuth.currentUser).updatePassword(newpassword);
	}

	async updateEmail(newemail: string) {
        return await (await this.afAuth.currentUser).updateEmail(newemail)
	}

	async fetchSignInMethodsForEmail(useremail: string){
		return await this.afAuth.fetchSignInMethodsForEmail(useremail)
	}

	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				useremail: user.email,
				uid: user.uid
			})

			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}
}