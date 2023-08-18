import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FichaTecnica } from 'src/app/models/ficha-tecnica';


@Component({
  selector: 'app-ficha-tecnica-dialog',
  templateUrl: './ficha-tecnica-dialog.component.html',
  styleUrls: ['./ficha-tecnica-dialog.component.css']
})
export class FichaTecnicaDialogComponent {

  
  constructor(
    public dialogRef: MatDialogRef<FichaTecnicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public fichaTecnica: FichaTecnica,

  ) { }

  timestampToMilliseconds(timestamp: any): number {
    return timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
}

printPDF() {
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4'
  });

  // Agrega el título
  pdf.setFontSize(22);
  pdf.text('Ficha técnica', 10, 20);

  var yPosition = 30;
  
  // yPosition =  this.addSection(pdf, `Datos del Alumno ${this.fichaTecnica.nombres} ${this.fichaTecnica.apellidoPaterno} ${this.fichaTecnica.apellidoMaterno} con numero de control ${this.fichaTecnica.numControl}`, yPosition, [
  //   ['Fecha Capturación de datos', new Date(this.timestampToMilliseconds(this.fichaTecnica.fecha)).toLocaleDateString()],
  //   ['Carrera ala que pertenece', this.fichaTecnica.carrera],
  //   ['Número de control', this.fichaTecnica.numControl],
  //   ['Semestre Actual', this.fichaTecnica.semestre],
  //   ['Apellido Paterno', this.fichaTecnica.apellidoPaterno],
  //   ['Apellido Materno', this.fichaTecnica.apellidoMaterno],
  //   ['Nombres', this.fichaTecnica.nombres],
  //   ['Sexo', this.fichaTecnica.sexo],
  //   ['Correo electrónico', this.fichaTecnica.correoElectronico],
  //   ['Teléfono', this.fichaTecnica.telefono],
  //   ['Domicilio', this.fichaTecnica.domicilio],
  //   ['Celular 1', this.fichaTecnica.celular1],
  //   ['Celular 2', this.fichaTecnica.celular2],
  //   ['Lugar de nacimiento', this.fichaTecnica.lugarNacimiento],
  //   ['Fecha Nacimiento', new Date(this.timestampToMilliseconds(this.fichaTecnica.fechaNacimiento)).toLocaleDateString()],
  //   ['Estado Civil', this.fichaTecnica.estadoCivil],
  //   ['Domicilio Actual', this.fichaTecnica.domicilioActual],
  //   ['Escolaridad', this.fichaTecnica.escolaridad],
  //   ['¿Haz estado becado?', this.fichaTecnica.becado],
  //   ['Nombre de la institución', this.fichaTecnica.nombreInstitucion],
  //   ['Nombre de la institución esfuerzoz', this.fichaTecnica.nombreInstitucionEsfuerzos],
  //   ['En el transcurso de tus estudios vivirás', this.fichaTecnica.vivirTranscursoEstudios],
  //   ['Trabajas', this.fichaTecnica.trabajas],
  //   ['Nombre de la empresa', this.fichaTecnica.nombreEmpresaTrabajo],
  //   ['Horarios de Trabajo', this.fichaTecnica.horarioTrabajo],
  //   ['Máximo Grado escolaridad Padre', this.fichaTecnica.maxGradoEscolaridadPadre],
  //   ['Máximo Grado escolaridad Madre', this.fichaTecnica.maxGradoEscolaridadMadre],
  //   ['¿Tu padre vive?', this.fichaTecnica.padreVive],
  //   ['¿Tu madre vive?', this.fichaTecnica.madreVive],
  //   ['Nombre de lugar trabajo padre', this.fichaTecnica.nombreLugarTrabajoPadre],
  //   ['Nombre de lugar trabajo Madre', this.fichaTecnica.nombreLugarTrabajoMadre],
  //   ['Nombre contacto de emergencia', this.fichaTecnica.nombreContactoEmergencia],
  //   ['Teléfono contacto de emergencia', this.fichaTecnica.telefonoContactoEmergencia],
  // ]);

  pdf.save(`Ficha-Tecnica_${this.fichaTecnica.numControl}-${this.fichaTecnica.nombres}.pdf`);
}
addSection(pdf: jsPDF, title: string, yPosition: number, data: string[][]) {
  pdf.setFontSize(14);
  pdf.text(title, 10, yPosition);

  const columns = ['Etiqueta', 'Valor'];
  const rows = data.map(row => ({ Etiqueta: row[0], Valor: row[1] }));

  const result = autoTable(pdf, {
    columns: columns.map(col => ({
      header: col,
      dataKey: col,
      cellWidth: 'wrap', // Ajusta automáticamente el ancho de la celda según el contenido
    })),
    body: rows,
    startY: yPosition + 5,
    margin: { left: 10, right: 10 },
    tableWidth: 'auto',
    styles: { cellPadding: 2 }, // Añade un pequeño relleno para que el texto no se toque con los bordes de las celdas
  });
  return yPosition; // Retorna la posición Y final después de agregar la tabla
}

}



