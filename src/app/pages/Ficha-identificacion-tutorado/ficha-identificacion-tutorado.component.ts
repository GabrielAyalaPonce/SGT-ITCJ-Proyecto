import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichaTecnica } from 'src/app/models/ficha-tecnica';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { FichaTecnicaService } from 'src/app/services/ficha-identifiacion.service';
import { takeUntil } from 'rxjs/operators';
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
  unsubscribe$ = new Subject<void>();


  constructor(private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userFirebaseService: UserFirebaseService,
    private fichatecnicaservice: FichaTecnicaService) {
    this.user$ = this.afAuth.user;
  }
  
  ngOnInit(): void {
    this.fichaTecnicaForm = this.formBuilder.group({
      carrera: ['', Validators.required],
      numControl: ['', Validators.required],
      semestre: ['', Validators.required],
      fecha: '',
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombres: ['', Validators.required],
      sexo: '',
      correoElectronico: ['', Validators.required],
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
      vivirTranscursoEstudios: ['', Validators.required],
      vivirConFamilia:['', Validators.required],
      vivirConFamiliaresCercanos: ['', Validators.required],
      vivirConOtrosEstudiantes: ['', Validators.required],
      vivirSolo:['', Validators.required],
      trabajas:['', Validators.required],
      nombreEmpresaTrabajo: ['', Validators.required],
      horarioTrabajo: ['', Validators.required],
      maxGradoEscolaridadPadre: '',
      maxGradoEscolaridadMadre: '',
      padreVive: ['', Validators.required],
      madreVive: ['', Validators.required],
      nombreLugarTrabajoPadre: '',
      nombreLugarTrabajoMadre: '',
      nombreContactoEmergencia: '',
      telefonoContactoEmergencia: '',
      uid: ''
    });

    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        this.userFirebaseService.getUserData(user.uid).subscribe((userData) => {
          // console.log(userData.fichaTecnica)
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
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        const fichaTecnicaData: FichaTecnica = this.fichaTecnicaForm.value;
        fichaTecnicaData.uid = user.uid;
        this.userFirebaseService
          .updateFichaTecnica(user.uid, fichaTecnicaData)
          .then(() => {
            // console.log('Ficha técnica actualizada con éxito');
            Notiflix.Notify.success('Ficha tecnica guardada con exito')
          })
          .catch((error) => {
            // console.error('Error al actualizar la ficha técnica', error);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}




  
  