import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTableData } from 'src/app/models/summary-alert';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserTutorI } from 'src/app/models/user-tutor-i';




@Component({
  selector: 'app-alert-summary',
  templateUrl: './alert-summary.component.html',
  styleUrls: ['./alert-summary.component.css']

  

})
export class AlertSummaryComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  columnsToDisplay : string[] = ['name','Ncontrol','EN$','N$','ADA','BDA','SM','AE','Psicologia'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //,'EN$','N$','ADA','BDA','SM','AE','Psicologia'
  constructor(private userfirebaseservice: UserFirebaseService) { }

  ngOnInit(): void {
    this.userfirebaseservice.getUsers().subscribe(users => {
      console.log('Mostrando usuarios',users);
      this.users = users.filter(user => user.Rol === 'tutorado' && user.Ncontrol !== '');
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  generatePDF() {
    // Obtener los datos de la tabla
    const data = this.dataSource.data;
    // Convertir los datos a formato JSON
    const jsonData = JSON.parse(JSON.stringify(data));
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    doc.setFontSize(9);

    const titulo = "RESUMEN DE ALERTAS";

    // Obtener la longitud del texto
    const textWidth = doc.getTextWidth(titulo);

    // Calcular el punto en el que se debe comenzar a dibujar el texto para centrarlo horizontalmente
    const startX = (doc.internal.pageSize.width - textWidth) / 2;

    // Dibujar el texto centrado en la página
    doc.text(titulo, startX, 10);

    // Función para centrar el texto horizontalmente
    function centerText(text:any, startY:any, fontSize:any) {
      const textWidth = doc.getTextWidth(text);
      const startX = (doc.internal.pageSize.width - textWidth) / 2;
      doc.setFontSize(fontSize);
      doc.text(text, startX, startY);
}

    const nombreTutor = (document.getElementById('inputNombreTutor') as HTMLInputElement).value;
    doc.text('Nombre del tutor: ' + nombreTutor, 10, 15);

    const departamento = (document.getElementById('inputDepartamento') as HTMLInputElement).value;
    doc.text('Departamento: ' + departamento, 10, 20);
    
    const inputSemestreIngreso = (document.getElementById('inputSemestreIngreso') as HTMLInputElement).value;
    doc.text('Semestre de ingreso: ' + inputSemestreIngreso, 10, 25);

    const carrera = (document.getElementById('inputCarrera') as HTMLInputElement).value;
    doc.text('Carrera ' + carrera, 10, 30);

    const grupo = (document.getElementById('inputGrupo') as HTMLInputElement).value;
    doc.text('Grupo: ' + grupo, 10, 35);

    const periodo = (document.getElementById('inputPeriodo') as HTMLInputElement).value;
    doc.text('Periodo ' + periodo, 10, 40);

    const fecha = (document.getElementById('inputFecha') as HTMLInputElement).value;
    doc.text('Fecha: ' + fecha, 10, 45);

    const horario = (document.getElementById('inputHorario') as HTMLInputElement).value;
    doc.text('Horario: ' + horario, 10, 50);

    
    


    // Crear la tabla en el documento PDF
    doc.autoTable({
      head: [
        ['Nombre', 'No.control', 'EN$', 'N$', 'ADA', 'BDA', 'SM', 'AE', 'Psicologia']
      ],
      body: jsonData.map((obj: any)  => {
        const row: any[] = [];
        this.columnsToDisplay.forEach(column => {
          row.push(obj[column]);
        });
        return row;
      }),
      margin: { top: 55 },
      headStyles: {
        halign: 'center',
        fillColor: [255, 255, 255 ],
        textColor: 0,
        lineWidth: 0.3,
        lineColor: [0,0,0],
        fontSize: 10
        
  
    },
    bodyStyles: {
        halign: 'center',
        fillColor: [245, 245, 245],
        textColor: 51,
        lineWidth: 0.3,
        lineColor: [0,0,0],
        fontSize:10
  },
  
    });

    // Descargar el documento PDF
    doc.save('Resumen_de_Alertas.pdf');

  }

  

}
