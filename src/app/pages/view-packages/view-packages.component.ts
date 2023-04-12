import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackagesService } from 'src/app/services/packages.service';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {
  packages!: any;
  searchTerm: string = '';
  panelOpenState = false;
  last:any;


  constructor(private packagesService: PackagesService, private router: Router) { }

  ngOnInit(): void {
    // Mostrar el loader rojo
    Notiflix.Loading.init({ svgColor: '#FF0000' });
    Notiflix.Loading.standard('Cargando paquetes...');
  
    this.packagesService.getPackages().subscribe(resp => {
      this.packages = resp;
      console.log('vamos viendo que tengo', this.packages);
  
      // Ocultar el loader una vez que se hayan cargado los datos
      Notiflix.Loading.remove();
    });
  }
  
}