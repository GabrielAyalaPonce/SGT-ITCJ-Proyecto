import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['name', 'email', 'Ncontrol', 'Rol'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private userfirebaseservice: UserFirebaseService) {}

  ngOnInit(): void {
    this.userfirebaseservice.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: User, filter: string) =>
      data.name.toLowerCase().includes(filter) ||
      data.email.toLowerCase().includes(filter) ||
      data.Rol.toLowerCase().includes(filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}