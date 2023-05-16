import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { PackageI } from '../models/packages';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  packageCollection!: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) { 
    this.packageCollection = this.firestore.collection('packages')
  }

        // Método para crear paquetes
        createPackage = async (data: any) => {
          try {
            const docRef = await this.firestore.collection("packages").add(data);
        
            // Agrega el ID del documento al campo 'id' del documento recién creado
            await this.firestore.collection("packages").doc(docRef.id).update({ id: docRef.id });
        
            return docRef.id;
          } catch (error) {
            // console.error("Error al agregar el documento: ", error);
            return null;
          }
        };
        

      // Método para obtener todos los paquetes
  getPackages(): Observable<PackageI[]> {
    return this.firestore.collection<PackageI>('packages').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as PackageI;
          data.id = a.payload.doc.id; 
          return data;
        });
      })
    );
  }
  
    // Método para obtener un paquete por id
  getPackageById(packageId: string): Observable<PackageI | null> {
    return this.firestore.collection<PackageI>('packages').doc(packageId).get().pipe(
      map(doc => {
        if (doc.exists) {
          const data = doc.data() as PackageI;
          data.id = doc.id; // Asigna el valor de id a la propiedad id del objeto data
          return data;
        } else {
          return null;
        }
      })
    );
  }
  

    // Método para eliminar un paquete
    deletePackage(packageId: string): Observable<void>{
      return new Observable<void>(observer => {
        this.firestore.collection("packages").doc(packageId).delete().then(() => {
          observer.next();
          observer.complete();
        }).catch((error) => {
          observer.error(error);
          observer.complete();
        });
      });
    }
  
     // Método para actualizar un paquete
  updatePackage(packageId: string, updatedData: PackageI): Observable<void> {
    return new Observable<void>(observer => {
      this.firestore.collection("packages").doc(packageId).update(updatedData).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
  

}
