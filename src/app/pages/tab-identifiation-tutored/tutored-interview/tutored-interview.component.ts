import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichaTecnica } from 'src/app/models/ficha-tecnica';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { takeUntil } from 'rxjs/operators';
import * as Notiflix from 'notiflix';
import { interviewTutoredI } from 'src/app/models/interview-tutored';
import { FichaTecnicaService } from 'src/app/services/tab-identifiation-tutored.service';

@Component({
  selector: 'app-tutored-interview',
  templateUrl: './tutored-interview.component.html',
  styleUrls: ['./tutored-interview.component.css']
})
export class TutoredInterviewComponent implements OnInit {

  user$: Observable<firebase.User | null>;
  interviewTutoredForm!: FormGroup;
  interviewTutoredFormSave: boolean = false;
  interviewTutored: FichaTecnica | null = null;
  unsubscribe$ = new Subject<void>();
  currentDate = new Date().toISOString().split('T')[0];

  
  caracteristicas = [
    'PUNTUAL', 'TIMID@', 'ALEGRE', 'AGRESIV@', 'Abierto a ideas de otros', 
    'Reflexivo/a', 'Constante', 'Optimista', 'Impulsivo/a', 'Silencioso/a', 'Generoso/a',
     'Inquieto/a', 'Cambios de humor', 'Dominante', 'Egoísta Sumiso/a', 'Confiado/a en sí mismo/a',
      'Imaginativo/a', 'Con iniciativa propia', 'Sociable', 'Responsable','Perseverante', 'Motivado/a', 'Activo/a Independiente'
  ];
  
  private buildComportamientoGroup(): FormGroup {
    const group: { [key: string]: any } = {};
    this.caracteristicas.forEach(caract => {
      group[caract] = ['']; 
    });
    return this.formBuilder.group(group);
  }
  

  constructor(private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userFirebaseService: UserFirebaseService,
    private fichaTecnicaService: FichaTecnicaService
  ) {
    this.user$ = this.afAuth.user;
  }

  
  
  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.interviewTutoredForm = this.formBuilder.group({
      fecha: [currentDate],
      ligadoafectivamente: ['', Validators.required],
      Descripciondeligadoafectivamente: ['', Validators.required],
      masocupadoeducacion: ['', Validators.required],
      actividadrecreativa: ['', Validators.required],
      infuidoencarrera: ['', Validators.required],
      Relacionconcompañeros: ['', Validators.required],
      Descripcionrelacioncompañeros: ['', Validators.required],
      Tenerpareja: ['', Validators.required],
      Descripcionrelacion: ['', Validators.required],
      Relacionconprofesores: ['', Validators.required],
      Relacionconautoridadesacademicas: ['', Validators.required],
      tiempolibre: ['', Validators.required],
      comportamientoUsuario: this.buildComportamientoGroup(),
      Cómotegustaríaser: ['', Validators.required],
      Ayudacontarea: ['', Validators.required],
      intervencionConestudios: ['', Validators.required],
      rendimientoEscolar: ['', Validators.required],
      materiasActuales: ['', Validators.required],
      asignaturaPreferida: ['', Validators.required],
      asignaturaSobresaliente: ['', Validators.required],
      asignaturaDesagradable: ['', Validators.required],
      asignaturaBajoPromedio: ['', Validators.required],
      porquevienesalTEC: ['', Validators.required],
      motivacionAsistiralTec: ['', Validators.required],
      planesinmediatos: ['', Validators.required],
      metasenlavida: ['', Validators.required],
      YoSoy: ['', Validators.required],
      Micaracteres: ['', Validators.required],
      Megustaque: ['', Validators.required],
      yoAspiroenlavida: ['', Validators.required],
      Yotengomiedoque: ['', Validators.required],
      comentarioadicional: ['',],
      uid: ''
    });
    

    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        this.userFirebaseService.getUserData(user.uid).subscribe((userData) => {
          // console.log('data de usuario', userData);
          //  console.log('id interview', userData.interview);
          if (userData && userData.interview) {
            this.fichaTecnicaService.getInterviews(userData.interview).subscribe((interviewInfo) => {
              this.interviewTutored = interviewInfo;
              this.interviewTutoredFormSave = true;
          });
          } else {
            this.interviewTutoredFormSave = false;
          }
        });
      }
    });
  


  }

  editInterview() {
    if (this.interviewTutored) {
      this.interviewTutoredForm.patchValue(this.interviewTutored);
      this.interviewTutoredFormSave = false;
    }
  }

  addInterview() {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        const interviewData: interviewTutoredI = this.interviewTutoredForm.value;
        interviewData.uid = user.uid;
        
        if (this.interviewTutored && this.interviewTutored.id) {
          this.fichaTecnicaService.updateInterview(this.interviewTutored.id, interviewData)
            .subscribe(() => {
              Notiflix.Notify.success('Tu entrevista fue actualizada con éxito');
            }, error => {
              console.error('Error al actualizar la entrevista', error);
            });
        } else {
          this.fichaTecnicaService.addInterview(interviewData)
            .subscribe(interviewID => {
              this.fichaTecnicaService.updateUserWithInterviewReference(user.uid, interviewID)
                .then(() => {
                  Notiflix.Notify.success('Tu entrevista fue creada con éxito');
                });
            }, error => {
              console.error('Error al guardar la entrevista', error);
            });
        }
      }
    });
}

  

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
