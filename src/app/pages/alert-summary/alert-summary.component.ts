import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import {PackageI} from 'src/app/models/packages';
import { AuthService } from 'src/app/services/usersAuthServices';
import 'firebase/auth';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ElementRef } from '@angular/core';
import { FichaTecnicaService } from 'src/app/services/tab-identifiation-tutored.service';



@Component({
  selector: 'app-alert-summary',
  templateUrl: './alert-summary.component.html',
  styleUrls: ['./alert-summary.component.css'],
})
export class AlertSummaryComponent  {


  currentUser: User | null = null;
  tutorados: User[] = [];
  TotalfilteredTutorados:any
   
  dataSource = new MatTableDataSource<User>([]);
  
  displayedColumns: string[] = ['NOMBRE', '#CONTROL', 'EN$', 'N$', 'ADA', 'BDA','SM',  'AE',  'PSICOLOGIA', 'DROGAS', 'DISCAPACIDAD'];
  
  columnDescriptions = {
    'NOMBRE': 'NOMBRE DEL ALUMNO',
    '#CONTROL':'NUMERO DE CONTROL',
    'EN$': 'INGRESOS MENORES A $4000',
    'ADA': 'ALTO DESEMPEÑO  ACADEMICO  9 O MÁS',
    'BDA': 'BAJO DESMPEÑO ACADÉMICO',
    'N$': 'INGRESOS ENTRE $4000 Y MENORES A $6000',
    'SM': 'SERVICIO MÉDICO',
    'AE': 'ACTIVIDADES EXTRAESCOLARES',
    'PSICOLOGIA': 'CANALIZACIÓN A PSICÓLOGO',
    'DROGAS' : 'USO DE DROGAS',
    'DISCAPACIDAD': 'ALUMNO TIENE ALGUNA DISCAPACIDAD'
  }

  constructor(private afs: AngularFirestore, private fichaTecnicaService:FichaTecnicaService ) {
    firebase.auth().onAuthStateChanged((user:any) => {
      this.currentUser = user as User;
      this.loadPackages();
    });
   }


   private loadPackages() {
    if (!this.currentUser) {
      return;
    }
   }

   ngOnInit(): void {
    if (this.currentUser) {
      this.afs
        .collection<PackageI>('packages', (ref) => ref.where('TutorAsignado', '==', this.currentUser!.uid))
        .valueChanges()
        .subscribe((packages: PackageI[]) => {
          // console.log('paquetes asignados a este tutor',packages)  
          // console.log('usuario actual', this.currentUser!.email)      
           const tutorados: User[] = packages
          .map(pkg => pkg.tutoradospkg)
          .filter(tutorado => !!tutorado)  // Agregar este filtro
          .flat()
          .filter(tutorado => tutorado !== undefined && tutorado.Ncontrol !== undefined) as User[];

          this.dataSource.data = tutorados
          
          tutorados.forEach(tutorado => {
            this.getFichaTecnicaForTutorado(tutorado.fichaTecnica);
            this.getInterviewForTutorado(tutorado.interview);
          });
      });
    }
    
}


getFichaTecnicaForTutorado(fichaTecnicaID: string): any {
  this.fichaTecnicaService.getFichaTecnica(fichaTecnicaID).subscribe((fichaInfo) => {
    let tutorados: any[] = this.dataSource.data;

    const tutoradosinfo = tutorados.find(t => t.fichaTecnica === fichaTecnicaID);

    if (tutoradosinfo) {
      let cumplioCondiciones = false;
      let ingresoTotal = 0;

      if (fichaInfo.viveconeingresos && fichaInfo.viveconeingresos.length > 0) {
        ingresoTotal = fichaInfo.viveconeingresos.reduce((acc: number, curr: any) => acc + Number(curr.ingresoMensual), 0);
      }

      if (ingresoTotal <= 4000) {
        tutoradosinfo['EN$'] = 'X';
        cumplioCondiciones = true;
      }
      if (ingresoTotal >= 4000 && ingresoTotal <= 6000) {
        tutoradosinfo['N$'] = 'X';
        cumplioCondiciones = true;
      }
      if (fichaInfo.usodedrogas === 'SI') {
        tutoradosinfo['DROGAS'] = 'X';
        cumplioCondiciones = true;
      }
      if (fichaInfo.discapacidadquepadece !== "Ninguna de las anteriores") {
        tutoradosinfo['DISCAPACIDAD'] = 'X';
        cumplioCondiciones = true;
      }

      // Si no cumple con ninguna de las condiciones, lo removemos de la lista
      if (!cumplioCondiciones) {
        const index = tutorados.indexOf(tutoradosinfo);
        if (index > -1) {
          tutorados.splice(index, 1);
        }
      }

      // Actualizar el dataSource
      this.dataSource.data = tutorados;
    }
  });
}




getInterviewForTutorado(interviewID: string): void {
    this.fichaTecnicaService.getInterviews(interviewID).subscribe((interviewInfo) => {
        // console.log('entrevista', interviewInfo)
    });
}

}
