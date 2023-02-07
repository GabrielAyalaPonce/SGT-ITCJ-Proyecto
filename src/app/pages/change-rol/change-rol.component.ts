import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-rol',
  templateUrl: './change-rol.component.html',
  styleUrls: ['./change-rol.component.css']
})
export class ChangeRolComponent implements OnInit {

public mostrarResultados: boolean = false;
public nombre: any;
public correo: any;
public numeroControl: any;
public carrera: any;
public rol: any;

buscarUsuario() {
  //lógica para buscar el usuario,
   this.nombre = "Luis Angel Mendez Hernandez";
   this.correo = "l18110529@itcj.edu.mx";
   this.numeroControl = "181110529";
   this.carrera = "Ingeniería en Sistemas";
   this.rol = "Tutorado";
   this.mostrarResultados = true;
 }
 

  constructor() { }

  ngOnInit(): void {
  }

}
