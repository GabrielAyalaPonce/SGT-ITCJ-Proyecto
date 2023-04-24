import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PackagesService } from 'src/app/services/packages.service';
import * as Notiflix from 'notiflix';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-package-tutor',
  templateUrl: './package-tutor.component.html',
  styleUrls: ['./package-tutor.component.css']
})
export class PackageTutorComponent implements OnInit {
  paquetesAsignados: any[] = [];
  panelOpenState = false;
  last: any;
  subjectsAndSchedules: any[] = [];
  editandoClave = false;
  publicados: { [packageId: string]: boolean } = {};
  tutoradospkg = [];

  saveKeyAuthorizationedit(paquete: any) {
    this.editandoClave = true;
  }


  constructor(private firestore: AngularFirestore,
              private packagesService: PackagesService,
              private afAuth: AngularFireAuth) { }

  ngOnInit(): void {

    Notiflix.Loading.standard('Cargando paquetes...');
 // Inicializa Notiflix
 Notiflix.Notify.init({
  width: '50%',
  position: 'center-center',
  fontSize: '1em',
  borderRadius: '5px',
});

this.packagesService.getPackages().subscribe(
  resp => console.log('paquetes', resp)
);
Notiflix.Loading.remove();

this.afAuth.authState.subscribe(user => {
  if (user) {
    const uid = user.uid;
    this.obtenerPaqueteAsignado(uid);
  } else {
    console.error('No hay un usuario en sesión.');
  }
});
  }



  obtenerPaqueteAsignado(uid: string): void {
    console.log('UID:', uid);
    this.firestore.collection('packages', ref => ref.where('TutorAsignado.uid', '==', uid)).valueChanges().subscribe(data => {
      console.log('Data:', data);
      if (data.length > 0) {
        this.paquetesAsignados = data;
        console.log(this.paquetesAsignados);
        this.paquetesAsignados.forEach(paquete => {
          this.publicados[paquete.id] = paquete.post;
        });
      } else {
        console.log('No se encontró paquete asignado.');
      }
    });
  }


  togglePublicarPaquete(packageId: string): void {
    const paquete = this.paquetesAsignados.find(p => p.id === packageId);
    const postActual = paquete.post;

    if (!paquete.keyAuthorization) {
      Notiflix.Confirm.show(
        'Confirmación',
        'El paquete no tiene clave de autorización, lo que significa que cualquier persona puede ingresar. ¿continuar?',
        'Sí',
        'No',
        () => {
          this.publicarPaqueteConfirmado(packageId, !postActual);
        },
        () => {
        }
      );
    } else {
      this.publicarPaqueteConfirmado(packageId, !postActual);
    }
  }

  

  publicarPaqueteConfirmado(packageId: string, post: boolean): void {
    const updatedData: any = {
      post: post
    };
    this.packagesService.updatePackage(packageId, updatedData).subscribe(
      () => {
        console.log('Paquete actualizado correctamente');
        this.publicados[packageId] = post;
        if (post) {
          Notiflix.Notify.success(`El paquete se publicó exitosamente`, {
            timeout: 2000
          });
        } else {
          Notiflix.Notify.warning('El paquete ya no está publicado', {
            timeout: 2000
          });
        }
      },
      (error) => {
        console.error('Error actualizando el paquete:', error);
      }
    );
  }

  saveKeyAuthorization(paquete: any): void {
    const updatedData: any = {
      ...paquete,
      keyAuthorization: paquete.keyAuthorization
    };
    this.packagesService.updatePackage(paquete.id, updatedData).subscribe(() => {
      console.log('KeyAuthorization actualizada con éxito');
      this.editandoClave = false;
      Notiflix.Notify.success('Clave guardada con exito');
    }, error => {
      console.error('Error al actualizar KeyAuthorization', error);
    });
  }

  async generateReport(tutorado: any): Promise<void> {
    const doc = new jsPDF('p', 'pt', 'letter');
    let finalY: number = 90 + 20; 
    const logo = new Image();

    logo.src = 'assets/img/itcj-img-report.png'; 
    doc.addImage(logo, 'PNG', 400, 10, 170, 33);
  

    doc.setFontSize(24);
    doc.text('Reporte de Calificaciones', 40, 60);
    doc.setLineWidth(1.5);
    doc.line(40, 70, 555, 70); 

    const studentInfo = [
      { title: 'Alumno', data: tutorado.name },
      { title: 'Número de control', data: tutorado.Ncontrol },
    ];
  
    console.log('Alumno',tutorado.name,  'Número de control',tutorado.Ncontrol)
    console.log('studentinfo',studentInfo)
  
    doc.autoTable({
      startY: 90,
      headStyles: { fillColor: [0, 0, 0] },
      bodyStyles: { fillColor: [255, 255, 255] },
      head: [['', 'Información Alumno']],
      body: studentInfo.map((info) => [info.title, info.data]),
      columnStyles: { 0: { cellWidth: '40%', halign: 'center' } },
      willDrawCell: (data: any) => {
        if (data.section === 'body' && data.row.index === studentInfo.length - 1) {
          finalY = data.cell.y + data.cell.height;
        }
      },
    });
    
  

    const gradesData = tutorado.grades && tutorado.grades.length > 0 ? tutorado.grades : [{ subject: 'Sin calificaciones', grade: '' }];
    console.log(gradesData)
  
    doc.autoTable({
      startY: finalY + 20, 
      headStyles: { fillColor: [0, 0, 0] },
      bodyStyles: { fillColor: [255, 255, 255] },
      head: [['Materias', 'Calificaciones']],
      body: gradesData.map((grade: any) => [grade.subject,grade.grade]),
      columnStyles: { 0: { cellWidth: '60%', halign: 'center' } },
    });
  
    doc.save(`${tutorado.Ncontrol}-${tutorado.name}_reporte.pdf`);
  }

  async generateGeneralReport(paquete: any): Promise<void> {
    const doc = new jsPDF('p', 'pt', 'letter');
    let finalY: number = 90 + 20;

    const logo = new Image();

    logo.src = 'assets/img/itcj-img-report.png'; 
    doc.addImage(logo, 'PNG', 400, 10, 170, 33);
  
    doc.setFontSize(24);
    doc.text('Reporte General de Calificaciones', 40, 60);
    doc.setLineWidth(1.5);
    doc.line(40, 70, 555, 70); 
  
    for (const tutorado of paquete.tutoradospkg) {
      const studentInfo = [
        { title: 'Alumno', data: tutorado.name },
        { title: 'Número de control', data: tutorado.Ncontrol },
      ];
  
      doc.autoTable({
        startY: finalY,
        headStyles: { fillColor: [0, 0, 0] },
        bodyStyles: { fillColor: [255, 255, 255] },
        head: [['', 'Información Alumno']],
        body: studentInfo.map((info) => [info.title, info.data]),
        columnStyles: { 0: { cellWidth: '40%', halign: 'center' } },
        willDrawCell: (data: any) => {
          if (data.section === 'body' && data.row.index === studentInfo.length - 1) {
            finalY = data.cell.y + data.cell.height;
          }
        },
      });
  
      const gradesData = tutorado.grades && tutorado.grades.length > 0 ? tutorado.grades : [{ subject: 'Sin calificaciones', grade: '' }];
  
      doc.autoTable({
        startY: finalY + 20,
        headStyles: { fillColor: [0, 0, 0] },
        bodyStyles: { fillColor: [255, 255, 255] },
        head: [['Materias', 'Calificaciones']],
        body: gradesData.map((grade: any) => [grade.subject, grade.grade]),
        columnStyles: { 0: { cellWidth: '60%', halign: 'center' } },
        willDrawCell: (data: any) => {
          if (data.section === 'body' && data.row.index === gradesData.length - 1) {
            finalY = data.cell.y + data.cell.height;
          }
        },
      });
      finalY += 40;
    }
    doc.save(`Reporte_General_paquete_${paquete.id}.pdf`);
  }
  
}