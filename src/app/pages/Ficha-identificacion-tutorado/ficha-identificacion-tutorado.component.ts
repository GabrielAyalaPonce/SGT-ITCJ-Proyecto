import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FichaTecnica } from 'src/app/models/ficha-tecnica';
import { FichaTecnicaService } from 'src/app/services/ficha-identifiacion.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ficha-identificacion-tutorado',
  templateUrl: './ficha-identificacion-tutorado.component.html',
  styleUrls: ['./ficha-identificacion-tutorado.component.css']
})
export class FichaIdentificacionTutoradoComponent implements OnInit  {

  user$: Observable<firebase.User | null>;
  fichaTecnicaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private fichaTecnicaService: FichaTecnicaService,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.user$ = this.afAuth.user ; 
  }

  ngOnInit(): void {
    // Inicializar el formulario vacío
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
  
    // Obtener el usuario actual y actualizar el valor del campo "uid" en el formulario
    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.fichaTecnicaForm.patchValue({
          uid: user.uid
        });
      }
    });
  }


  agregarFichaTecnica(): void {
    const fichaTecnica: FichaTecnica = this.fichaTecnicaForm.value;
    this.fichaTecnicaService.agregarFichaTecnica(fichaTecnica).subscribe(() => {
      // Si se agrega correctamente
      console.log('Ficha técnica agregada exitosamente');
      this.snackBar.open('Guardado exitosamente', '', { duration: 1000 });
    }, error => {
      console.error(error);
    });
  }

  obtenerFichasTecnicas(): void {
    this.fichaTecnicaService.obtenerFichasTecnicas().subscribe(fichasTecnicas => {
      console.log(fichasTecnicas);
    }, error => {
      console.error(error);
    });
  }

  actualizarFichaTecnica(id: ''): void {
    const fichaTecnica: FichaTecnica = this.fichaTecnicaForm.value;
    this.fichaTecnicaService.actualizarFichaTecnica(id, fichaTecnica).subscribe(() => {
      console.log('Ficha técnica actualizada exitosamente');
    }, error => {
      console.error(error);
    });
  }

  eliminarFichaTecnica(id: ''): void {
    this.fichaTecnicaService.eliminarFichaTecnica(id).subscribe(() => {
      console.log('Ficha técnica eliminada exitosamente');
    }, error => {
      console.error(error);
    });
  }

}