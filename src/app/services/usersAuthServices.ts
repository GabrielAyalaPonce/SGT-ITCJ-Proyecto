import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import { PackageI } from '../models/packages';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  currentUser$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.currentUser$ = this.afAuth.authState.pipe(
      map((user: firebase.default.User | null) => {
        if (user) {
          return {
            uid: user.uid, // Agrega la propiedad uid con el valor de user.uid
            name: user.displayName || '',
            email: user.email || '',
            Rol: 'tutor'
          } as User;
        } else {
          return null;
        }
      })
    );
  }
}
