import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-errors';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorsService {


   constructor( private firestore:AngularFirestore,) {
   
   }

   getUsername(user:User) {
    return this.firestore.collection('users').doc(user.name).snapshotChanges();
  }

  codeError(code: string) {
    switch (code) {
      // El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      // Contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

      // Correo invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';

      // Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';

      // El usuario no existe
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';
      default:
        return 'Error desconocido';
    }
}

}
