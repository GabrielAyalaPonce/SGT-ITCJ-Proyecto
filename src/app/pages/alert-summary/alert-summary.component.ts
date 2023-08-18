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



@Component({
  selector: 'app-alert-summary',
  templateUrl: './alert-summary.component.html',
  styleUrls: ['./alert-summary.component.css'],
})
export class AlertSummaryComponent  {


  currentUser: User | null = null;
  tutorados: User[] = [];
   
  dataSource = new MatTableDataSource<User>([]);
  
  displayedColumns: string[] = ['NOMBRE', '#CONTROL', 'EN$', 'N$', 'ADA', 'BDA','SM',  'AE',  'PSICOLOGIA', 'USODEDROGAS', 'DISCAPACIDAD'];
  

  constructor(private afs: AngularFirestore ) {
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
        .collection<PackageI>('packages', (ref) => ref.where('TutorAsignado.uid', '==', this.currentUser!.uid))
        .valueChanges()
        .subscribe((packages: PackageI[]) => {
          console.log(packages)  
          console.log('usuario actual', this.currentUser!.email)       //   const tutorados: User[] = packages
        //   .map(pkg => pkg.tutoradospkg)
        //   .flat()
        //   .filter(tutorado => tutorado !== undefined && tutorado.Ncontrol !== undefined) as User[];
        // this.dataSource.data = tutorados;
      });
  }
   

}
}
