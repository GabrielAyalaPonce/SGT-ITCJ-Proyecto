import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FichaTecnica } from 'src/app/models/ficha-tecnica';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { FichaTecnicaService } from 'src/app/services/ficha-identifiacion.service';
import * as Notiflix from 'notiflix';



@Component({
  selector: 'app-ficha-identificacion-tutorado',
  templateUrl: './ficha-identificacion-tutorado.component.html',
  styleUrls: ['./ficha-identificacion-tutorado.component.css']
})
export class FichaIdentificacionTutoradoComponent implements OnInit  {

  user$: Observable<firebase.User | null>;
  fichaTecnicaForm!: FormGroup;
  fichaTecnicaGuardada: boolean = false;
  fichaTecnica: FichaTecnica | null = null;

  constructor(private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userFirebaseService: UserFirebaseService,
    private fichatecnicaservice: FichaTecnicaService) {
    this.user$ = this.afAuth.user;
  }
  
  ngOnInit(): void {
    this.fichaTecnicaForm = this.formBuilder.group({
      carrera: '',
      numControl: '',
      semestre: '',
      fecha: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombres: '',
      sexo: '',
      correoElectronico: '',
      telefono: '',
      domicilio: '',
      celular1: '',
      celular2: '',
      fechaNacimiento: '',
      lugarNacimiento: '',
      estadoCivil: '',
      domicilioActual: '',
      escolaridad: '',
      nombreInstitucion: '',
      becado: '',
      gobiernoFederal: '',
      gobiernoEstatal: '',
      esfuerzosBachillerato: '',
      nombreInstitucionEsfuerzos: '',
      vivirTranscursoEstudios: '',
      vivirConFamilia: '',
      vivirConFamiliaresCercanos: '',
      vivirConOtrosEstudiantes: '',
      vivirSolo: '',
      trabajas: '',
      nombreEmpresaTrabajo: '',
      horarioTrabajo: '',
      maxGradoEscolaridadPadre: '',
      maxGradoEscolaridadMadre: '',
      padreVive: '',
      madreVive: '',
      nombreLugarTrabajoPadre: '',
      nombreLugarTrabajoMadre: '',
      nombreContactoEmergencia: '',
      telefonoContactoEmergencia: '',
      uid: ''
    });

    this.user$.subscribe((user) => {
      if (user) {
        this.userFirebaseService.getUserData(user.uid).subscribe((userData) => {
          console.log(userData.fichaTecnica)
          if (userData && userData.fichaTecnica) {
            this.fichaTecnicaGuardada = true;
            this.fichaTecnica = userData.fichaTecnica;
          } else {
            this.fichaTecnicaGuardada = false;
          }
        });
      }
    });

  }

  editarFichaTecnica() {
    if (this.fichaTecnica) {
      this.fichaTecnicaForm.patchValue(this.fichaTecnica);
      this.fichaTecnicaGuardada = false;
    }
  }


  agregarFichaTecnica() {
    this.user$.subscribe((user) => {
      if (user) {
        const fichaTecnicaData: FichaTecnica = this.fichaTecnicaForm.value;
        fichaTecnicaData.uid = user.uid;
        this.userFirebaseService
          .updateFichaTecnica(user.uid, fichaTecnicaData)
          .then(() => {
            console.log('Ficha técnica actualizada con éxito');
            Notiflix.Notify.success('Ficha tecnica guardada con exito')
          })
          .catch((error) => {
            console.error('Error al actualizar la ficha técnica', error);
          });
      }
    });
  }


}




  
  