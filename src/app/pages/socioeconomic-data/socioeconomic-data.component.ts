import { Component, OnInit } from '@angular/core';

interface Ocupation {
  value: string;
  viewValue: string;
}

interface Denpend {
  value: string;
  viewValue: string;
}

interface house {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-socioeconomic-data',
  templateUrl: './socioeconomic-data.component.html',
  styleUrls: ['./socioeconomic-data.component.css']
})
export class SocioeconomicDataComponent implements OnInit {

  ocupations: Ocupation[] = [
    {value: 'No lo se-0', viewValue: 'No lo se'},
    {value: 'Labores del Hogar-1', viewValue: 'Labores del Hogar'},
    {value: 'Dueño de negocio, empresa, despacho o comercio estable-3', viewValue: 'Dueño de negocio, empresa, despacho o comercio estable'},
    {value: 'Profesor, investigador-4', viewValue: 'Profesor, investigador'},
    {value: 'Profesionista que ejerce por su cuenta-5', viewValue: 'Profesionista que ejerce por su cuenta'},
    {value: 'Obrero-6', viewValue: 'Obrero'},
    {value: 'Ganadero, agricultor o similar-7', viewValue: 'Ganadero, agricultor o similar'},
    {value: 'Campesino, jornalero, pescador o similar-8', viewValue: 'Campesino, jornalero, pescador o similar'},
    {value: 'Jubilado o pensionado-9', viewValue: 'Jubilado o pensionado'},
    {value: 'Funcionario o gerente de empresa privada-10', viewValue: 'Funcionario o gerente de empresa privada'},
    {value: 'Funcionario de empresa publica', viewValue: 'Funcionario de empresa publica'},
    {value: 'Empleado, oficinista o secretaria de empresa privada-12', viewValue: 'Empleado, oficinista o secretaria de empresa privada'},
    {value: 'Burocrata, oficinista o secretaria de empresa publica-13', viewValue: 'Burocrata, oficinista o secretaria de empresa publica'},
    {value: 'Trabajador de oficio con personal a su cargo-14', viewValue: 'Trabajador de oficio con personal a su cargo'},
    {value: 'Vendedor en comercio o empresa-15', viewValue: 'Vendedor en comercio o empresa'},
    {value: 'Vendedor por su cuenta o ambulante-16', viewValue: 'Vendedor por su cuenta o ambulante'},
    {value: 'Peon, ayudante, mozo o empleada domestica-17', viewValue: 'Peon, ayudante, mozo o empleada domestica'},
    {value: 'Miembro de las fuerzas armadas-18', viewValue: 'Miembro de las fuerzas armadas'},
    {value: 'Otro-19', viewValue: 'Otro'},
  ];

  
  depends: Denpend[] = [
    {value: 'Padre y Madre-0', viewValue: 'Padre y Madre'},
    {value: 'Padre, Madre y Yo mismo-1', viewValue: 'Padre, Madre y Yo mismo'},
    {value: 'Padre-2', viewValue: 'Padre'},
    {value: 'Padre y Yo mismo-3', viewValue: 'Padre y Yo mismo'},
    {value: 'Madre-4', viewValue: 'Madre'},
    {value: 'Madre y Yo mismo-5', viewValue: 'Madre y Yo mismo'},
    {value: 'Hermanos-6', viewValue: 'Hermano'},
    {value: 'Hermanos y Yo mismo-7', viewValue: 'Hermanos y Yo mismo'},
    {value: 'Conyuge o pareja-8', viewValue: 'Conyuge o pareja'},
    {value: 'Conyuge, pareja y Yo mismo-9', viewValue: 'Conyuge, pareja y Yo mismo'},
    {value: 'Otro familiar o amigo-10', viewValue: 'Otro familiar o amigo'},
    {value: 'Yo mismo-11', viewValue: 'Yo mismo'},
    {value: 'Otro-12', viewValue: 'Otro'},
  ];


  houses: house[] = [
    {value: 'Propia-0', viewValue: 'Propia'},
    {value: 'Rentada-1', viewValue: 'Rentada'},
    {value: 'Prestada-2', viewValue: 'Prestada'},
    {value: 'Se esta pagando-3', viewValue: 'Se esta pagando'},
    {value: 'otra', viewValue: 'otra'},
  ];
  
  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  


  constructor() { }

  ngOnInit(): void {
  }

}
