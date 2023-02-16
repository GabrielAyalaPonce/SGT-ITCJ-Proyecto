import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';




export interface UserData {
  id: string;
  name: string;
  email: string;
  Rol: string;
}

const EMAIL: string[] = [
  'angelm.h.z@hotmail.com',
  'l18110529@itcj.edu.mx',
  'l17110853@itcj.edu.mx',
  'l193673745@itcj.edu.mx',
  'l204758202@itcj.edu.mx',
];

const ROLES: string[] = [
  'Admin',
  'Tutor',
  'Tutorado',
  'coordinador',
];
const NAMES: string[] = [
  'Angel',
  'Gabo',
  'Noe',
  'margarita',
  'luis',
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent   implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'Rol'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    email: EMAIL[Math.round(Math.random() * (EMAIL.length - 1))],
    Rol: ROLES[Math.round(Math.random() * (ROLES.length - 1))],
  };
}
