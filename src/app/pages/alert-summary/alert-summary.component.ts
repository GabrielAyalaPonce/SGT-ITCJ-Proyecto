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
          .flat()
          .filter(tutorado => tutorado !== undefined && tutorado.Ncontrol !== undefined) as User[];

          this.dataSource.data = tutorados;
          // console.log('tutorados de este tutor', this.dataSource.data);

          tutorados.forEach(tutorado => {
            this.getFichaTecnicaForTutorado(tutorado.fichaTecnica);
            this.getInterviewForTutorado(tutorado.interview);
          });
      });
    }
}

shouldIncludeTutorado(tutorado: any): boolean {
  return tutorado['EN$'] === 'X' || 
         tutorado['N$'] === 'X' || 
         tutorado['DROGAS'] === 'X' || 
         tutorado['DISCAPACIDAD'] === 'X';
}

getFichaTecnicaForTutorado(fichaTecnicaID: string): void {
  this.fichaTecnicaService.getFichaTecnica(fichaTecnicaID).subscribe((fichaInfo) => {


    
      // console.log('fichatecnica', fichaInfo);

    

      // Obtener tutorados actuales.
      let tutorados = this.dataSource.data;

      // Buscar tutorado actual basado en fichaTecnicaID (puedes adaptarlo si hay otra forma más directa).
      let tutorado:any = tutorados.find(t => t.fichaTecnica === fichaTecnicaID);

      // console.log('variable de tutorado',tutorado)

      if (tutorado) {
      
        let ingresoTotal = 0;
        if (fichaInfo.viveconeingresos && fichaInfo.viveconeingresos.length > 0) {
            ingresoTotal = fichaInfo.viveconeingresos.reduce((acc: number, curr: any) => acc + Number(curr.ingresoMensual), 0);
        }

              console.log('ingresos',ingresoTotal)

          // Agrega X en las columnas adecuadas.
          if (ingresoTotal <= 4000) {
              tutorado['EN$'] = 'X';
          }
          if (ingresoTotal >= 4000 && ingresoTotal <= 6000) {
              tutorado['N$'] = 'X';
          }
          if (fichaInfo.usodedrogas === 'SI') {
              tutorado['DROGAS'] = 'X';
          }
          if (fichaInfo.discapacidadquepadece !== "Ninguna de las anteriores") {
              tutorado['DISCAPACIDAD'] = 'X';
          }

          if (!this.shouldIncludeTutorado(tutorado)) {
            return; // Si no cumple con ninguna condición, no lo agregues al dataSource
        }


          // Actualizar tutorados en el dataSource.
          this.dataSource.data = [...tutorados];

          console.log('datos actualizados', this.dataSource.data)
      }
  });
}


getInterviewForTutorado(interviewID: string): void {
    this.fichaTecnicaService.getInterviews(interviewID).subscribe((interviewInfo) => {
        console.log('entrevista', interviewInfo)
    });
}

}
