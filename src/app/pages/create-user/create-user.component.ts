import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    controlNumber: new FormControl('', [Validators.required]),
    Rol: new FormControl('', [Validators.required])
  });

  addPerson() {
  // lógica para agregar una persona utilizando los datos del formulario
  }


  constructor() { }

  ngOnInit(): void {
  }

}
