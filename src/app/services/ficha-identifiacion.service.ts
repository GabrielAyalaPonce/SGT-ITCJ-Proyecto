import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FichaTecnica } from '../models/ficha-tecnica';

@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {
  fichaTecnicaCollection: AngularFirestoreCollection<FichaTecnica>;

  constructor(private firestore: AngularFirestore) {
    this.fichaTecnicaCollection = this.firestore.collection('fichatecnica');
  }

  agregarFichaTecnica(fichaTecnica: FichaTecnica): Observable<void> {
    return new Observable<void>(observer => {
      this.fichaTecnicaCollection.add(fichaTecnica)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  obtenerFichasTecnicas(): Observable<FichaTecnica[]> {
    return this.fichaTecnicaCollection.valueChanges({ idField: 'id' });
  }

  actualizarFichaTecnica(id: string, fichaTecnica: FichaTecnica): Observable<void> {
    return new Observable<void>(observer => {
      this.fichaTecnicaCollection.doc(id).update(fichaTecnica)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  eliminarFichaTecnica(id: string): Observable<void> {
    return new Observable<void>(observer => {
      this.fichaTecnicaCollection.doc(id).delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }




  
}

