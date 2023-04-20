import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PackagesService } from 'src/app/services/packages.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-package-own-information',
  templateUrl: './package-own-information.component.html',
  styleUrls: ['./package-own-information.component.css']
})
export class PackageOwnInformationComponent  implements OnInit {
  paquetesAsignados: any[] = [];
  panelOpenState = false;

  constructor(private firestore: AngularFirestore, private packagesService: PackagesService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {

     // Inicializa Notiflix
  Notiflix.Notify.init({
    width: '50%',
    position: 'center-center',
    fontSize: '1em',
    borderRadius: '5px',
  });

  // Obtener todos los paquetes (si es necesario)
  this.packagesService.getPackages().subscribe(
    resp => console.log('paquetes', resp)
  );

  // Comprueba si hay un usuario en sesión y obtén el paquete asignado
  this.afAuth.authState.subscribe(user => {
    if (user) {
      const uid = user.uid;
      this.obtenerPaqueteAsignado(uid);
    } else {
      console.error('No hay un usuario en sesión.');
    }
  });
}

// Cambia la función obtenerPaqueteAsignado para buscar paquetes con el usuario actual en tutoradospkg
obtenerPaqueteAsignado(uid: string): void {
  console.log('UID:', uid);
  this.firestore.collection('packages').valueChanges({ idField: 'docId' }).subscribe(packages => {
    packages.forEach((packageData: any) => {
      const tutorados = packageData.tutoradospkg || [];
      const matchedTutorado = tutorados.find((tutorado: any) => tutorado.uid === uid);
      if (matchedTutorado) {
        this.paquetesAsignados.push({ ...packageData, docId: packageData.docId });
        console.log(this.paquetesAsignados);
      }
    });
  });
}

}
