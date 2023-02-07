import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.css']
})
export class StudentRequestsComponent implements OnInit {

  displayedColumns = ['nombre','NDC','tema', 'modalidad', 'fecha', 'comentarios', 'status'];



  constructor() { }

  ngOnInit(): void {
  }

  dataSource: any[] = [
    {
      nombre:"Luis Angel Mendez Hernandez",
      NDC:"18110529",
      tema: "Materia",
      modalidad: 'presencial',
      fecha: "1/02/2023",
      comentarios: `Tengo pendiente un tema con una materia.`,
          status: 'finalizada',
    },
  ]

  accepted = false;

  accept() {
    this.accepted = true;
  }

}
