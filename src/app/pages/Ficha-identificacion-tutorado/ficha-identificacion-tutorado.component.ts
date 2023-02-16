import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ficha-identificacion-tutorado',
  templateUrl: './ficha-identificacion-tutorado.component.html',
  styleUrls: ['./ficha-identificacion-tutorado.component.css']
})
export class FichaIdentificacionTutoradoComponent implements OnInit {

  datosGeneralesForm:any = FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.datosGeneralesForm = this.formBuilder.group({
      carrera: ['', Validators.required],
      numControl: ['', Validators.required],
      semestre: ['', Validators.required],
      fecha: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombres: ['', Validators.required],
      sexo: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required],
      celular1: ['', Validators.required],
      celular2: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      lugarNacimiento: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      numHijos: ['', Validators.required],
      domicilioActual: ['', Validators.required],
      escolaridad: ['', Validators.required],
      nombreInstitucion: ['', Validators.required],
      becado: ['', Validators.required],
      gobiernoFederal: ['', Validators.required],
      gobiernoEstatal: ['', Validators.required],
      esfuerzosBachillerato: ['', Validators.required],
      nombreInstitucionEsfuerzos: [''],
      vivirConFamilia: ['', Validators.required],
      vivirConFamiliaresCercanos: ['', Validators.required],
      vivirConOtrosEstudiantes: ['', Validators.required],
      vivirSolo: ['', Validators.required],
      trabajas: ['', Validators.required],
      nombreEmpresaTrabajo: [''],
      horarioTrabajo: [''],
      maxGradoEscolaridadPadre: ['', Validators.required],
      maxGradoEscolaridadMadre: ['', Validators.required],
      padreVive: ['', Validators.required],
      madreVive: ['', Validators.required],
      nombreLugarTrabajoPadre: [''],
      nombreLugarTrabajoMadre: [''],
      nombreContactoEmergencia: ['', Validators.required],
      telefonoContactoEmergencia: ['', Validators.required]
    });
  }

}
