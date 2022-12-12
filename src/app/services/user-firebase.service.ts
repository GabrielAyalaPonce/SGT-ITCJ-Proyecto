import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {

  constructor(private firestore: AngularFirestore) { }

// Crea un documento
    crear(user:User) {
    return this.firestore.collection('users').add(user);
}
  
  // Obtiene un documento 
  getUsername(user:User) {
    return this.firestore.collection('users').doc(user.name).snapshotChanges();
  }
  
  // Obtiene todos los documentos
  // getUsers():Observable<User>{
  //   const userRef = this.firestore.collection(this.firestore, 'users');
  //   // return collectionData(userRef,{name:'name'}) as Observable<User>
  // }
  
  // Actualiza un documento
  // actualizar(documentId: string, data) {
  //   return this.firestore.collection('items').doc(documentId).set(data);
  // }
  
  // Elimina un documento
  eliminar(documentId: string): Promise<void> {
    return this.firestore.collection('items').doc(documentId).delete();
  }
}
