import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { UsersFilterPipe } from 'src/app/pipes/users-filter.pipe';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

@Component({
  selector: 'app-academic-portafolios-tutor',
  templateUrl: './academic-portafolios-tutor.component.html',
  styleUrls: ['./academic-portafolios-tutor.component.css']

})


export class AcademicPortafoliosTutorComponent implements OnInit {
  users: User[] = [];
 
  dataSource = new MatTableDataSource<User>(this.users);
  

  columnsToDisplay : string[] = ['name','Ncontrol','grup','ind','conferencias',
  'Beca','total','apro','prom','Acad','Psic','Med','Adm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  

  @ViewChild('inputGrup') inputGrup!: ElementRef;
  @ViewChild('inputInd') inputInd!: ElementRef;
  @ViewChild('inputConferencias') inputConferencias!: ElementRef;
  @ViewChild('inputBeca') inputBeca!: ElementRef;
  @ViewChild('inputTotalMaterias') inputTotalMaterias!: ElementRef;
  @ViewChild('inputMateriasAprobadas') inputMateriasAprobadas!: ElementRef;
  @ViewChild('inputPromedio') inputPromedio!: ElementRef;
  @ViewChild('inputCanalizacionAcademica') inputCanalizacionAcademica!: ElementRef;
  @ViewChild('inputCanalizacionPsicologica') inputCanalizacionPsicologica!: ElementRef;
  @ViewChild('inputCanalizacionMedica') inputCanalizacionMedica!: ElementRef;
  @ViewChild('inputCanalizacionAdministrativa') inputCanalizacionAdministrativa!: ElementRef;


  //,'EN$','N$','ADA','BDA','SM','AE','Psicologia'
  constructor(private userfirebaseservice: UserFirebaseService) {
    
   }

  

  ngOnInit(): void {
    
    this.userfirebaseservice.getUsers().subscribe(users => {
     this.dataSource = new MatTableDataSource();
     console.log('Mostrando usuarios',users);
       this.dataSource = new MatTableDataSource(users);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    console.log(this.inputGrup); // Comprueba si inputGrup es nulo
    console.log(this.inputInd); // Comprueba si inputInd es nulo
    console.log(this.inputConferencias); // Comprueba si inputConferencias es nulo
    // ...comprueba otras referencias a los elementos del DOM
  }

  generatePDF() {
    // Obtener los datos de la tabla
    const data = this.dataSource.data;
    // Convertir los datos a formato JSON
    const jsonData = JSON.parse(JSON.stringify(data));
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    doc.setFontSize(9);


    const nombreTutor = (document.getElementById('inputNombreTutor') as HTMLInputElement).value;
    doc.text('Nombre del tutor: ' + nombreTutor, 10, 10);

    const departamento = (document.getElementById('inputDepartamento') as HTMLInputElement).value;
    doc.text('Departamento: ' + departamento, 10, 15);
    
    const fecha = (document.getElementById('inputFecha') as HTMLInputElement).value;
    doc.text('Fecha: ' + fecha, 10, 20);

    const programaAcademico = (document.getElementById('programaAcademico') as HTMLInputElement).value;
    doc.text('Programa Academico de los tutorados ' + programaAcademico, 10, 25);

    const cohorte = (document.getElementById('inputCohorte') as HTMLInputElement).value;
    doc.text('Cohorte: ' + cohorte, 10, 30);

    const hora = (document.getElementById('inputHora') as HTMLInputElement).value;
    doc.text('Hora: ' + hora, 10, 35);

    const tut = (document.getElementById('inputTut') as HTMLInputElement).value;
    doc.text('Tut: ' + tut, 10, 40);

    const grupal = (document.getElementById('inputGrupal') as HTMLInputElement).value;
    doc.text('Grupal: ' + grupal, 10, 45);

    
    


    // Crear la tabla en el documento PDF
    doc.autoTable({
      head: [
        ['Nombre', 'No.control', 'Grup', 'Ind', 'Conf', 'Beca', 'Total', 'Apro', 'Prom', 'Acad', 'Psic', 'Méd', 'Adm']
      ],
      body: jsonData.map((obj: any)  => {
        const row: any[] = [];
        this.columnsToDisplay.forEach(column => {
          row.push(obj[column]);
        });
        return row;
      }),
      margin: { top: 50 },
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

    const previousAutoTable = (doc as any).lastAutoTable;
    const actividadesAdicionales = (document.getElementById('actividadesAdicionales') as HTMLInputElement).value;
    doc.text('Actividades Adicionales: ' + actividadesAdicionales, 10, (doc as any).previousAutoTable.finalY+8);
    
    const observaciones = (document.getElementById('observaciones') as HTMLInputElement).value;
    doc.text('Observaciones: ' + observaciones, 10, (doc as any).previousAutoTable.finalY+20);

    const lineaY = previousAutoTable.finalY + 40;
    const espacioEntreLineas = 25;
    const lineaAncho = 45;

    // Dibujar la primera línea
    const linea1XInicio = 10;
    const linea1XFin = linea1XInicio + lineaAncho;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(linea1XInicio, lineaY, linea1XFin, lineaY);

    // Dibujar la segunda línea con un espacio entre la primera y la segunda línea
    const linea2XInicio = linea1XFin + espacioEntreLineas;
    const linea2XFin = linea2XInicio + lineaAncho;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(linea2XInicio, lineaY, linea2XFin, lineaY);

    // Dibujar la tercera línea con un espacio entre la segunda y la tercera línea
    const linea3XInicio = linea2XFin + espacioEntreLineas;
    const linea3XFin = linea3XInicio + lineaAncho;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(linea3XInicio, lineaY, linea3XFin, lineaY);

    // Dibujar la cuarta línea con un espacio de 10 unidades por debajo de la tercera línea
    const linea4XInicio = 10;
    const linea4XFin = linea4XInicio + lineaAncho;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(linea4XInicio, lineaY + 10, linea4XFin, lineaY + 10);

    // Dibujar la quinta línea con un espacio de 10 unidades por debajo de la cuarta línea
    const linea5XInicio = linea4XFin + espacioEntreLineas;
    const linea5XFin = linea5XInicio + lineaAncho;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(linea5XInicio, lineaY + 10, linea5XFin, lineaY + 10);

    // Dibujar la sexta línea con un espacio de 10 unidades por debajo de la quinta línea
    const linea6XInicio = linea5XFin + espacioEntreLineas;
    const linea6XFin = linea6XInicio + lineaAncho;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(linea6XInicio, lineaY + 10, linea6XFin, lineaY + 10);


    //Texto Nombre y Firma del Tutor debajo del primer par de lineas
    const linea1Centro = (linea1XInicio + linea1XFin) / 2;
    const linea4Centro = (linea4XInicio + linea4XFin) / 2;
    const centro = (linea1Centro + linea4Centro) / 2;
    
    doc.text('Nombre y Firma del Tutor', centro, lineaY + 15, {
      align: 'center'
    });

    //Texto Nombre y Firma Coordinador de Tutorias  debajo del segundo par de lineas
    const linea2Centro = (linea2XInicio + linea2XFin) / 2;
    const linea5Centro = (linea5XInicio + linea5XFin) / 2;
    const centro2 = (linea2Centro + linea5Centro) / 2;
    
    doc.text('Nombre y Firma ', centro2, lineaY + 15, {
      align: 'center'
    });
    doc.text('Coordnador de Tutorias del Departamento ', centro2, lineaY + 18, {
      align: 'center'
    });

     //Texto Nombre y Firma Coordinador de Tutorias  debajo del segundo par de lineas
     const linea3Centro = (linea3XInicio + linea3XFin) / 2;
     const linea6Centro = (linea6XInicio + linea6XFin) / 2;
     const centro3 = (linea3Centro + linea6Centro) / 2;
     
     doc.text('Nombre y Firma ', centro3, lineaY + 15, {
       align: 'center'
     });
     doc.text('Jefe del Departamento Academico ', centro3, lineaY + 18, {
       align: 'center'
     });

  
  
  
    // Descargar el documento PDF
    doc.save('Reporte_semestral_tutor.pdf');

  }

  vaciarInputs() {
    this.dataSource.data.forEach(element => {
      this.inputGrup.nativeElement.value = '';
      this.inputInd.nativeElement.value = '';
      this.inputConferencias.nativeElement.value = '';
      this.inputBeca.nativeElement.value='';
      this.inputTotalMaterias.nativeElement.value='';
      this.inputMateriasAprobadas.nativeElement.value='';
      this.inputPromedio.nativeElement.value='';
      this.inputCanalizacionAcademica.nativeElement.value='';
      this.inputCanalizacionPsicologica.nativeElement.value='';
      this.inputCanalizacionMedica.nativeElement.value='';
      this.inputCanalizacionAdministrativa.nativeElement.value='';
    });

  }
  
  }

  

  