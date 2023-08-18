import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichaTecnica } from 'src/app/models/ficha-tecnica';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { takeUntil } from 'rxjs/operators';
import * as Notiflix from 'notiflix';
import { FichaTecnicaService } from 'src/app/services/tab-identifiation-tutored.service';

@Component({
  selector: 'app-socio-economic-study',
  templateUrl: './socio-economic-study.component.html',
  styleUrls: ['./socio-economic-study.component.css']
})
export class SocioEconomicStudyComponent implements OnInit {

  user$: Observable<firebase.User | null>;
  studySocioeconomicForm!: FormGroup;
  studySocioeconomicSave: boolean = false;
  studySocioeconomic: FichaTecnica | null = null;
  unsubscribe$ = new Subject<void>();
  currentDate = new Date().toISOString().split('T')[0];



  constructor(private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private userFirebaseService: UserFirebaseService,
    private fichaTecnicaService: FichaTecnicaService) {
    this.user$ = this.afAuth.user;
  }
  
  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.studySocioeconomicForm = this.formBuilder.group({
      nombres: ['',  Validators.required],
      apellidoPaterno:  ['',  Validators.required],
      apellidoMaterno:  ['',  Validators.required],
      numControl:  ['',  Validators.required],
      carrera:  ['',  Validators.required],
      domicilio:  ['',  Validators.required],
      campus:  ['',  Validators.required],
      sexo:  ['',  Validators.required],
      correoElectronico:  ['',  Validators.required],
      telefono:  ['',  Validators.required],
      fechaNacimiento: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      celular1: ['',Validators.required],
      lugarNacimiento: ['',Validators.required],
      semestre: ['' ,Validators.required],
      fecha: [currentDate],
      enfermedadcronica: ['', Validators.required],
      nombreenfermedadcronica: ['',], 
      tomamedicamento: ['', Validators.required],
      nombremedicamento :['',],
      vivirtranscursoestudios: ['', Validators.required],
      usodedrogas: ['', Validators.required],
      nombreinstitucion: ['', Validators.required],
      promgralprep: ['', Validators.required],
      becamanutencion: ['', Validators.required],
      becatransporte: ['', Validators.required],
      becaalimentacion: ['',Validators.required],
      becanomencionada: ['',Validators.required], 
      booksread: ['',Validators.required], 
      gruposrepresentativosenpreparatoria: ['',Validators.required],
      nombregruposrepresentativosenpreparatoria : ['',],
      pertenecegrupooclub:  ['',Validators.required],
      nombrepertenecegrupooclub:[''],
      razonparaestudiar:  ['',  Validators.required],
      trabajasenlactualidad:  ['',  Validators.required],
      dependesdetuspadres:  ['',  Validators.required],
      mediotransporte:  ['',  Validators.required],
      tiempollegadacasaescuela:  ['',  Validators.required],
      discapacidadquepadece:  ['',  Validators.required],
      discapacidadpsicosocial:  ['',  Validators.required],
      diagnosticadoporunprofesional:  [''],
      perteneciaaetnia:  ['',  Validators.required],
      nombreetnia: ['',],
      uid: '',
    });



    this.studySocioeconomicForm.addControl('viveconeingresos', this.formBuilder.array([]));

    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        this.userFirebaseService.getUserData(user.uid).subscribe((userData) => {
           console.log(userData);
          console.log(userData.fichaTecnica);
          if (userData && userData.fichaTecnica) {
            this.fichaTecnicaService.getFichaTecnica(userData.fichaTecnica).subscribe((fichaInfo) => {
              this.studySocioeconomic = fichaInfo;
              this.studySocioeconomicSave = true;
            });
          } else {
            this.studySocioeconomicSave = false;
          }
        });
      }
    });


    
    this.agregarPersona();
  }

  

  get viveConIngresos(): FormArray {
    return this.studySocioeconomicForm.get('viveconeingresos') as FormArray;
}

agregarPersona(): void {
  const persona = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      parentesco: ['', Validators.required],
      gradoEstudios: ['', Validators.required],
      ocupacion: ['', Validators.required],
      ingresoMensual: ['', [Validators.required, Validators.pattern(/^\d{3,}$/)]]
  });

  this.viveConIngresos.push(persona);
}

eliminarPersona(): void {
  const viveConIngresos = this.viveConIngresos;
  if (viveConIngresos.length > 0) {
      viveConIngresos.removeAt(viveConIngresos.length - 1);
  }
}

  editarFichaTecnica() {
    if (this.studySocioeconomic && this.studySocioeconomic.viveconeingresos) {
      const itemsLength = this.studySocioeconomic.viveconeingresos.length;
      
      const viveConIngresosControl = this.viveConIngresos;
      while (viveConIngresosControl.length !== itemsLength) {
          if (viveConIngresosControl.length < itemsLength) {
              this.agregarPersona();
          } else {
              this.eliminarPersona();
          }
      }
      this.studySocioeconomicForm.patchValue(this.studySocioeconomic);
      this.studySocioeconomicSave = false;
  }
  
  }

  agregarFichaTecnica() {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user) {
        const fichaTecnicaData: FichaTecnica = this.studySocioeconomicForm.value;
        fichaTecnicaData.uid = user.uid;
        if (this.studySocioeconomic && this.studySocioeconomic.id) {
          // Si ya existe una ficha técnica, la actualizamos
          this.fichaTecnicaService.actualizarFichaTecnica(this.studySocioeconomic.id, fichaTecnicaData)
            .subscribe(() => {
              Notiflix.Notify.success('Tu estudio socioeconomico fue actualizado con éxito');
            }, error => {
              console.error('Error al actualizar la ficha técnica', error);
            });
        } else {
          // Si no existe una ficha técnica, la creamos
          this.fichaTecnicaService.agregarFichaTecnica(fichaTecnicaData)
            .subscribe(fichaTecnicaId => {
              this.fichaTecnicaService.updateUserWithFichaTecnicaReference(user.uid, fichaTecnicaId)
                .then(() => {
                  Notiflix.Notify.success('Tu estudio socioeconomico fue creado con éxito');
                });
            }, error => {
              console.error('Error al guardar la ficha técnica', error);
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


