  
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User} from './user.module';


@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: Observable<any>;
    public userToken: string;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        //private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                 return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            }   else {
                 return of(null);
                    }
            })
        )};
    

      GetToken(user): string {
        return user.getIdToken()
      }
    


  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.useremail,
      token: user.token
    };

    return userRef.set(data, { merge: true });

  }

}
//*/