import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-change-rol',
  templateUrl: './change-rol.component.html',
  styleUrls: ['./change-rol.component.css']
})
export class ChangeRolComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  currentUserId!: string;
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['name', 'email', 'Ncontrol', 'Rol','actions'];
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

  changeUserRole(newRole: string) {
    const userId = this.currentUserId; // aquí debes reemplazar por la forma en que estás obteniendo el ID del usuario actualmente autenticado
    this.userfirebaseservice.updateUserRole(userId, newRole)
      .then(() => console.log(`Rol actualizado a ${newRole}`))
      .catch((error) => console.error(`Error al actualizar el rol: ${error}`));
  }
  

}