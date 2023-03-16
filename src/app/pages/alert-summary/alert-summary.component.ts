import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTableData } from 'src/app/models/summary-alert';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { UserTutorI } from 'src/app/models/user-tutor-i';


@Component({
  selector: 'app-alert-summary',
  templateUrl: './alert-summary.component.html',
  styleUrls: ['./alert-summary.component.css']
})
export class AlertSummaryComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  columnsToDisplay : string[] = ['name','Ncontrol'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //,'EN$','N$','ADA','BDA','SM','AE','Psicologia'
  constructor(private userfirebaseservice: UserFirebaseService) { }

  ngOnInit(): void {
    this.userfirebaseservice.getUsers().subscribe(users => {
      console.log('Mostrando usuarios',users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
