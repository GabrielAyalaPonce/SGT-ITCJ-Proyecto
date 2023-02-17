import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {

public path:string = 'users';
public id:string = '77lbAHrnuohegmzBboBgJu481pR2';
constructor(private firestore:AngularFirestore,
           private afAuth: AngularFireAuth) { }

stateUser(){
  return this.afAuth.authState
}


createDoc(data:any, path:string, id:any){
const collection = this.firestore.collection(path)
return collection.doc(id).set(data)
}

updateUserRole(userId: any): Promise<void> {
  return this.firestore.collection('users').doc(userId).update({ Rol: 'coordinador' });
}

updateDoc(data: any, collection: string, docId: string): Promise<void> {
  return this.firestore.collection(collection).doc(docId).update(data);
}

  getDoc<tipo>(path:string, id:string){
    return this.firestore.collection(path).doc<tipo>(id).get().pipe(
    map(doc => {
      if (doc.exists) {
        return doc.data() as tipo;
      } else {
        return console.log('documento no existe');
      }
    })
  );
  }

getCollection<tipo>(path:string){
 const collection = this.firestore.collection<tipo>(path)
 return collection.valueChanges()
}
 

}
