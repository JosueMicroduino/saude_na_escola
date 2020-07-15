import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { UserService } from './user.service'

//interface isLoggedIn {
//  status: boolean
//}

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService 
    ) {}
/*
  canActivate(next, state): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
       // else {
       //   this.router.navigate(['root']);
        //}
      })
    )
  }
  */
 /*
  async canActivate(route) {
		if(await this.user.isAuthenticated()) {
      //this.router.navigate(['/tabs/inicio'])
			return true
		}

		this.router.navigate(['/login'])
		return false
  }
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')){
        return true;
    }
    else {
      //const token =  this.auth.GetToken(this.user)
      //localStorage.setItem('token',token)
      //return true;
      this.router.navigate(['/login']);
      return false;

    }
      //(error) => {
      //console.log('No user logged in.');
      //this.router.navigate(['/login']);
      //return false;
        //return false;
      //}
    //}
  }
}