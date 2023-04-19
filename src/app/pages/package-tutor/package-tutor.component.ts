import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PackagesService } from 'src/app/services/packages.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-package-tutor',
  templateUrl: './package-tutor.component.html',
  styleUrls: ['./package-tutor.component.css']
})
export class PackageTutorComponent implements OnInit {
  paquetesAsignados: any[] = []; 
  panelOpenState = false;
  last:any;
  subjectsAndSchedules : any[] = [];
  editandoClave = false;

  saveKeyAuthorizationedit(paquete:any) {
    this.editandoClave = true;
  }

  constructor(private firestore: AngularFirestore, private packagesService: PackagesService ) { }

  ngOnInit(): void {

    
    Notiflix.Notify.init({
      width: '50%',
      position: 'center-center', 
      fontSize: '1em',
      borderRadius: '5px',
    });
 
    this.packagesService.getPackages().subscribe(
      resp=> console.log('paquetes', resp)
    )
    this.obtenerPaqueteAsignado('VVXGIPI4ttMZzTQRzLKuPxi0sDs1'); // Reemplaza esto con el ID del usuario actual.
  }

  obtenerPaqueteAsignado(uid: string): void {
    console.log('UID:', uid);
    this.firestore.collection('packages', ref => ref.where('TutorAsignado.uid', '==', uid)).valueChanges().subscribe(data => {
      console.log('Data:', data);
      if (data.length > 0) {
        this.paquetesAsignados = data;
        console.log(this.paquetesAsignados);
      } else {
        console.log('No se encontró paquete asignado.');
      }
    });
  }



  saveKeyAuthorization(paquete: any): void {
    const updatedData: any = {
      ...paquete,
      keyAuthorization: paquete.keyAuthorization
    };
    this.packagesService.updatePackage(paquete.id, updatedData).subscribe(() => {
      console.log('KeyAuthorization actualizada con éxito');
      this.editandoClave = false;
     Notiflix.Notify.success('Clave guardada con exito');
    }, error => {
      console.error('Error al actualizar KeyAuthorization', error);
    });
  }
  
}

