import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, tap } from 'rxjs/operators';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.authState.pipe(
        take(1),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.ngZone.run(() => {
              Notiflix.Notify.warning('No intentes acceder a las rutas sin autorizacion!');
            });
            // console.log('access denied');
            this.router.navigate(['/login']);
          }
        })
      );
  }
}

Notiflix.Notify.init({
  width: '50%',
  position: 'center-center', 
  fontSize: '1em',
  borderRadius: '5px',
});