import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  currentUser$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.currentUser$ = this.afAuth.authState.pipe(
      switchMap((user: firebase.default.User | null) => {
        if (user) {
          return user.getIdToken().then((token: string) => {
            // // Almacena el token en localStorage
            // localStorage.setItem('userToken', token);

            return {
              uid: user.uid, 
              name: user.displayName || '',
              email: user.email || '',
              Rol: 'tutor',
              token: token 
            } as User;
          });
        } else {
          // Si el usuario no está autenticado, borra el token de localStorage
          localStorage.removeItem('userToken');
          return Promise.resolve(null);
        }
      })
    );
  }
}
