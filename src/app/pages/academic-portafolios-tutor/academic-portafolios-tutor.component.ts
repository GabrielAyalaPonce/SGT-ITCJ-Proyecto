import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { NgIf } from '@angular/common';
import { UsersFilterPipe } from 'src/app/pipes/users-filter.pipe';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-academic-portafolios-tutor',
  templateUrl: './academic-portafolios-tutor.component.html',
  styleUrls: ['./academic-portafolios-tutor.component.css']
})
export class AcademicPortafoliosTutorComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  

  columnsToDisplay : string[] = ['name','Ncontrol','grup','ind','conferencias',
  'Beca','total','apro','prom','Acad','Psic','Med','Adm'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //,'EN$','N$','ADA','BDA','SM','AE','Psicologia'
  constructor(private userfirebaseservice: UserFirebaseService) { }

  ngOnInit(): void {
    
    this.userfirebaseservice.getUsers().subscribe(users => {
     this.dataSource = new MatTableDataSource();
     console.log('Mostrando usuarios',users);
       this.dataSource = new MatTableDataSource(users);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      });
  }

  
}
