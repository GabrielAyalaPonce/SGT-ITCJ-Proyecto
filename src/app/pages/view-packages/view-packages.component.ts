import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackagesService } from 'src/app/services/packages.service';
import * as Notiflix from 'notiflix';
import { PackageI } from 'src/app/models/packages';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { UserTutorI } from 'src/app/models/user-tutor-i';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {
  packages!: PackageI[]; 
  searchTerm: string = '';
  panelOpenState = false;
  last:any;
  pkg!:any;
  deleteModeActive: boolean = false;
  infoTutor!: any

  toggleDeleteMode(): void {
    this.deleteModeActive = !this.deleteModeActive;
  }

  togglePackageToDelete(pkg: PackageI, event: MouseEvent): void {
    if (this.deleteModeActive) {
      pkg.toDelete = !pkg.toDelete;
      this.deletePackage(pkg);
    }
  }
  

  constructor(private packagesService: PackagesService, private router: Router,  private userFirebaseService: UserFirebaseService) { }

  ngOnInit(): void {
    Notiflix.Loading.init({ svgColor: '#FF0000' });
    Notiflix.Loading.standard('Cargando paquetes...');
  
    this.packagesService.getPackages().subscribe(resp => {
      this.packages = resp.map(pkg => {
        return { ...pkg, toDelete: false };
      });
     console.log('todos los paquetes existentes', this.packages)

      this.packages.forEach(pkg => {
         console.log('tutor asignado', pkg.TutorAsignado)
        if (pkg.TutorAsignado) {
          this.userFirebaseService.getTutorById(pkg.TutorAsignado).subscribe(tutorInfo => {
            pkg.infoTutor = tutorInfo;
            console.log(pkg.infoTutor)
          });
        }
    });
    
  
      Notiflix.Loading.remove();
    });
  }
  
// Dentro de la clase ViewPackagesComponent

deletePackage(pkg: PackageI): void {
  if (pkg.toDelete) {
    Notiflix.Confirm.show(
      'Eliminar paquete',
      '¿Estás seguro de que deseas eliminar este paquete?',
      'Sí',
      'No',
      () => {
        // Función que se ejecuta al hacer clic en "Sí"
        this.packagesService.deletePackage(pkg.id).subscribe(() => {
          const index = this.packages.indexOf(pkg);
          if (index > -1) {
            this.packages.splice(index, 1);
          }
          Notiflix.Notify.success('Paquete eliminado exitosamente.', );
        }, error => {
          // console.log(error);
          Notiflix.Notify.failure('Error al eliminar el paquete.');
        });
      },
      () => {
        // Función que se ejecuta al hacer clic en "No"
        pkg.toDelete = false;
      }
    );
  }
}




  
}