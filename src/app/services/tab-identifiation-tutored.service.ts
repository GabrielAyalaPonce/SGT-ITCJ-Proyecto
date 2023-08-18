import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { FichaTecnica } from '../models/ficha-tecnica';
import { interviewTutoredI } from '../models/interview-tutored';

@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {
  
  fichaTecnicaCollection: AngularFirestoreCollection<FichaTecnica>;
  interviewCollection!: AngularFirestoreCollection<interviewTutoredI>;

  constructor(private firestore: AngularFirestore) {
    this.fichaTecnicaCollection = this.firestore.collection('fichatecnica');
    this.interviewCollection = this.firestore.collection('interviewtutored');
  }

  agregarFichaTecnica(fichaTecnica: FichaTecnica): Observable<string> {
    return new Observable<string>(observer => {
      this.fichaTecnicaCollection.add(fichaTecnica)
        .then(docRef => {
          observer.next(docRef.id);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  updateUserWithFichaTecnicaReference(userId: string, fichaTecnicaId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({ fichaTecnica: fichaTecnicaId });
  }

  getFichaTecnica(id: string): Observable<FichaTecnica> {
    return this.firestore.collection('fichatecnica').doc(id).snapshotChanges().pipe(
        map(snapshot => {
            const data = snapshot.payload.data() as FichaTecnica;
            const docId = snapshot.payload.id;
            return { ...data, id: docId };
        })
    );
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

  





  addInterview(interview: interviewTutoredI): Observable<any> {
    return new Observable<string>(observer => {
      this.interviewCollection.add(interview)
      .then(docRef => {
        observer.next(docRef.id);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
  }



  getInterviews(id: string): Observable<any> {
    return this.firestore.collection('interviewtutored').doc(id).snapshotChanges().pipe(
      map(snapshot => {
          const data = snapshot.payload.data() as FichaTecnica;
          const docId = snapshot.payload.id;
          return { ...data, id: docId };
      })
  );
  }



  updateUserWithInterviewReference(userId: string, interviewId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({ interview: interviewId });
  }

  updateInterview(id: string, interview: interviewTutoredI): Observable<void> {
    return new Observable<void>(observer => {
      this.interviewCollection.doc(id).update(interview)
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

