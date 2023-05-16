import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TutorRequest } from 'src/app/models/tutor-request';
import { TutorRequestService } from 'src/app/services/tutor-request.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-tutor-request',
  templateUrl: './tutor-request.component.html',
  styleUrls: ['./tutor-request.component.css']
})
export class TutorRequestComponent {

  user$: Observable<firebase.User | null>;

  solicitudForm = new FormGroup({
    tema: new FormControl('', Validators.required),
    modalidad: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    archivo: new FormControl(),
  });

  constructor(private tutorRequestService: TutorRequestService,private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.user ;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.solicitudForm.patchValue({
      archivo: file
    });
  }

  onSubmit() {
    this.user$.subscribe(user => {
      const data: TutorRequest = {
        fecha: new Date(),
        tema: this.solicitudForm.value.tema ?? '',
        modalidad: this.solicitudForm.value.modalidad ?? '',
        descripcion: this.solicitudForm.value.descripcion?? '',
        archivo: this.solicitudForm.value.archivo,
        uid: user?.uid
      };
      this.tutorRequestService.addTutorRequest(data)
      .then(res => {
        // console.log('Solicitud enviada con éxito', res);
        this.solicitudForm.reset();
      })
      .catch(error => {
        // console.log('Error al enviar solicitud:', error);
      });
  });
}
}
