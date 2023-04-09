import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserTutorI } from 'src/app/models/user-tutor-i';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { PackagesService } from 'src/app/services/packages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  newPackage!: FormGroup;
  tutorControl!: any;
  packageName!: any;
  dataTutor!: object;
  nameTutor!: string;
  users: UserTutorI[] = [];
  existingPackages: string[] = [];
  tutorAsignado: string | null = null;
  subject!: string;
  schedule!: string;
  newPackage2!: FormGroup;

  constructor(private packagesservice: PackagesService,
    private userfirebaseservice: UserFirebaseService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      this.newPackage2 = this.fb.group({
        inputs: this.fb.array([])
      });
  }

  dataSource = new MatTableDataSource<UserTutorI>([]);
  displayedColumns: string[] = ['name', 'email', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.newPackage = new FormGroup({
      namePackage: new FormControl('', Validators.required),
      tutor: new FormControl('', Validators.required),
    });

    this.userfirebaseservice.getTutorUsers().subscribe(users => {
      console.log('Usuarios en la BD', users)
      this.dataSource = new MatTableDataSource<any>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.packagesservice.getPackages().subscribe(packages => {
      this.existingPackages = packages.map((p: { nombrePaquete: any; }) => p.nombrePaquete);
    });

    this.aaddInputs(5); // Agrega esta línea para inicializar el FormArray con 3 grupos
  }


  get inputControls(): FormArray {
    return this.newPackage2.get('inputs') as FormArray;
  }

  addMore() {
    // Agregamos 3 inputs más cada vez que se presione el botón
    this.aaddInputs(1);
  }

  ngAfterViewInit() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: UserTutorI, filter: string) =>
      data.name.toLowerCase().includes(filter) ||
      data.email.toLowerCase().includes(filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aaddInputs(count: number) {
    const inputsArray = this.newPackage2.get('inputs') as FormArray;

    for (let i = 0; i < count; i++) {
      inputsArray.push(
        this.fb.group({
          subject: '',
          schedule: '',
          teacher: ''
        })
      );
    }
  }

  seleccionarTutor(user: UserTutorI) {
    this.tutorControl = this.newPackage.get('tutor');
    if (this.tutorControl) {
      this.tutorControl.setValue(user);
     
      this.dataTutor = this.tutorControl.value;
      this.nameTutor = this.tutorControl.value.name;
    
      // Mostrar el snackbar con el mensaje
      this.snackBar.open(`Tutor Seleccionado: ${this.nameTutor}`, 'Cerrar', { duration: 3000 });
    }

    


  }

  savePackageName() {
  this.packageName = this.newPackage.get('namePackage')?.value;
  }
  
  savePackage() {
  const packageName = this.newPackage.get('namePackage')?.value;
  if (this.existingPackages.includes(packageName)) {
  this.snackBar.open('Ya existe un paquete con el mismo nombre', 'Cerrar', { duration: 3000 });
  } else {
  const data = {
  nombrePaquete: packageName,
  TutorAsignado: this.dataTutor
  };
  this.packagesservice.createPackage(data);
  this.snackBar.open('El Paquete : ${this.packageName} se creo exitosamente', 'Cerrar', { duration: 3000 });
  }
  }
  }