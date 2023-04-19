import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PackagesService } from 'src/app/services/packages.service';
import * as Notiflix from 'notiflix';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-package-tutor',
  templateUrl: './package-tutor.component.html',
  styleUrls: ['./package-tutor.component.css']
})
export class PackageTutorComponent implements OnInit {
  paquetesAsignados: any[] = [];
  panelOpenState = false;
  last: any;
  subjectsAndSchedules: any[] = [];
  editandoClave = false;
  publicados: { [packageId: string]: boolean } = {};

  saveKeyAuthorizationedit(paquete: any) {
    this.editandoClave = true;
  }

  constructor(private firestore: AngularFirestore, private packagesService: PackagesService) { }

  ngOnInit(): void {


    Notiflix.Notify.init({
      width: '50%',
      position: 'center-center',
      fontSize: '1em',
      borderRadius: '5px',
    });

    this.packagesService.getPackages().subscribe(
      resp => console.log('paquetes', resp)
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
        // Asignar el estado de publicación
        this.paquetesAsignados.forEach(paquete => {
          this.publicados[paquete.id] = paquete.post;
        });
      } else {
        console.log('No se encontró paquete asignado.');
      }
    });
  }


  togglePublicarPaquete(packageId: string): void {
    const paquete = this.paquetesAsignados.find(p => p.id === packageId);
    const postActual = paquete.post;

    if (!paquete.keyAuthorization) {
      Notiflix.Confirm.show(
        'Confirmación',
        'El paquete no tiene clave de autorización, lo que significa que cualquier persona puede ingresar. ¿continuar?',
        'Sí',
        'No',
        () => {
          this.publicarPaqueteConfirmado(packageId, !postActual);
        },
        () => {
        }
      );
    } else {
      this.publicarPaqueteConfirmado(packageId, !postActual);
    }
  }

  publicarPaqueteConfirmado(packageId: string, post: boolean): void {
    const updatedData: any = {
      post: post
    };
    this.packagesService.updatePackage(packageId, updatedData).subscribe(
      () => {
        console.log('Paquete actualizado correctamente');
        this.publicados[packageId] = post;
        if (post) {
          Notiflix.Notify.success(`El paquete se publicó exitosamente`, {
            timeout: 2000
          });
        } else {
          Notiflix.Notify.warning('El paquete ya no está publicado', {
            timeout: 2000
          });
        }
      },
      (error) => {
        console.error('Error actualizando el paquete:', error);
      }
    );
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
