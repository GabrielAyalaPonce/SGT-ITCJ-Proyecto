import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { PackagesI } from '../models/packages';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  packageCollection!: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) { 
    this.packageCollection = this.firestore.collection('packages')
  }



  createPackage = async (data:any) => {
    try {
      const docRef = await this.firestore.collection("packages").add(data);
      console.log("Documento agregado con ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
      return null;
    }
  };

  getPackages(): Observable<any> {
    return this.firestore.collection<any>('packages').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }



}
