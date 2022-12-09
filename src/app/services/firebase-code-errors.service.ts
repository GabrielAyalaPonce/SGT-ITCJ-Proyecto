import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-errors';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorsService {


   constructor( private firestore:AngularFirestore) {
   
    }

     createDoc(data:any):Promise<any> {
      return this.firestore.collection('Usuarios').add(data);
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
