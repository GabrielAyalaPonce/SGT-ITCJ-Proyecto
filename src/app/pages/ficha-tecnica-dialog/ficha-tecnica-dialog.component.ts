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
  
  yPosition =  this.addSection(pdf, `Datos del Alumno ${this.fichaTecnica.nombres} ${this.fichaTecnica.apellidoPaterno} ${this.fichaTecnica.apellidoMaterno} con numero de control ${this.fichaTecnica.numControl}`, yPosition, [
   
   //informacion personal 
   ['Fecha Capturación de datos', new Date(this.timestampToMilliseconds(this.fichaTecnica.fecha)).toLocaleDateString()],
   ['Nombres', this.fichaTecnica.nombres],
   ['Apellido Paterno', this.fichaTecnica.apellidoPaterno],
   ['Apellido Materno', this.fichaTecnica.apellidoMaterno],
   ['Numero control', this.fichaTecnica.numControl],
   ['Carrera ala que pertenece', this.fichaTecnica.carrera],
   ['Domicilio', this.fichaTecnica.domicilio],
   ['Campus', this.fichaTecnica.campus],
   ['Correo electrónico', this.fichaTecnica.correoElectronico],
   ['Teléfono', this.fichaTecnica.telefono],
   ['Fecha Nacimiento', new Date(this.timestampToMilliseconds(this.fichaTecnica.fechaNacimiento)).toLocaleDateString()],
   ['Sexo', this.fichaTecnica.sexo],
   ['Estado Civil', this.fichaTecnica.estadoCivil],
   ['Celular 1', this.fichaTecnica.celular1],
   ['Lugar de nacimiento', this.fichaTecnica.lugarNacimiento],
   ['Semestre Actual', this.fichaTecnica.semestre],
  //salud
  ['Padece alguna enfermedad cronica', this.fichaTecnica.enfermedadcronica],
  ['Toma algun medicamento', this.fichaTecnica.tomamedicamento],
  ['En el transcurso de tus estudios vivirás', this.fichaTecnica.vivirtranscursoestudios],
  ['Usas drogas', this.fichaTecnica.usodedrogas],
  //Informacion escolar
  ['Nombre preparatoria', this.fichaTecnica.nombreinstitucion],
  ['Promedio general preparatoria', this.fichaTecnica.promgralprep],
  ['Cuenta con beca de manutencion', this.fichaTecnica.becamanutencion],
  ['Cuenta con beca de transporte', this.fichaTecnica.becatransporte],
  ['Cuenta con beca de alimentacion', this.fichaTecnica.becaalimentacion],
  ['Cuenta con beca no mencionada', this.fichaTecnica.becanomencionada],
  ['Libros leidos', this.fichaTecnica.booksread],
  //participacion en grupos
  ['Formo parte de grupos representativos deportivos o culturales en la preparatoria', this.fichaTecnica.gruposrepresentativosenpreparatoria],
  ['Pertenece a algún club o grupo (iglesia, social, del barrio, deportivo,', this.fichaTecnica.pertenecegrupooclub],
  ['Razon para estudiar', this.fichaTecnica.razonparaestudiar],
  //situacion laboral
  ['Trabajas', this.fichaTecnica.trabajasenlactualidad],
  ['Depende economicamente de tus padres o tutores', this.fichaTecnica.dependesdetuspadres],
//constitucion familiar
['Peronas con las que vive e ingresos', this.getViveConIngresosString()],
//medio de trasnporte
['Medios de transporte que utiliza para trasladarte de su casa a la escuela y viceversa.', this.fichaTecnica.mediotransporte],
['Cuanto tiempo le toma llegar de su casa ala escuela', this.fichaTecnica.tiempollegadacasaescuela],
//seccion de inclusion
['Discapacidad que padece', this.fichaTecnica.discapacidadquepadece],
['Discapacidad que psicosocial padece', this.fichaTecnica.discapacidadpsicosocial],
['Pertence a una etnia', this.fichaTecnica.perteneciaaetnia],
  ]);

  pdf.save(`Ficha-Tecnica_${this.fichaTecnica.numControl}-${this.fichaTecnica.nombres}.pdf`);
}

getViveConIngresosString(): string {
  return this.fichaTecnica.viveconeingresos
    .map((persona:any) => 
      `${persona.nombre} (Edad: ${persona.edad}, Ingreso Mensual: ${persona.ingresoMensual})`
    )
    .join(', ');
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



