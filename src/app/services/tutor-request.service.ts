import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TutorRequest } from '../models/tutor-request';

@Injectable({
  providedIn: 'root'
})
export class TutorRequestService {
  private collectionName = 'tutorRequest';

  constructor(private firestore: AngularFirestore) {}

  addTutorRequest(tutorRequest: TutorRequest): Promise<void> {
    return this.firestore.collection<TutorRequest>(this.collectionName)
      .add(tutorRequest)
      .then(() => console.log('Tutor request added'))
      .catch((error) => console.error('Error adding tutor request', error));
  }

  getTutorRequests(): Observable<TutorRequest[]> {
    return this.firestore.collection<TutorRequest>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  updateTutorRequest(id: string, tutorRequest: TutorRequest): Promise<void> {
    return this.firestore.collection<TutorRequest>(this.collectionName)
      .doc(id)
      .set(tutorRequest)
      .then(() => console.log('Tutor request updated'))
      .catch((error) => console.error('Error updating tutor request', error));
  }

  deleteTutorRequest(id: string): Promise<void> {
    return this.firestore.collection<TutorRequest>(this.collectionName)
      .doc(id)
      .delete()
      .then(() => console.log('Tutor request deleted'))
      .catch((error) => console.error('Error deleting tutor request', error));
  }
}
