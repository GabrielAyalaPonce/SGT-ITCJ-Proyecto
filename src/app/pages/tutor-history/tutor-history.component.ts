import { Component, OnInit } from '@angular/core';
import { solicitud } from 'src/app/models/solicitud'; 

@Component({
  selector: 'app-tutor-history',
  templateUrl: './tutor-history.component.html',
  styleUrls: ['./tutor-history.component.css']
})
export class TutorHistoryComponent implements OnInit {




  displayedColumns = ['tema', 'modalidad', 'fecha', 'comentarios', 'status'];


   dataSource: solicitud[] = [
    {
      tema: "Materia",
      modalidad: 'presencial',
      fecha: "1/02/2023",
      comentarios: `Tengo pendiente un tema con una materia.`,
          status: 'finalizada',
    },
      {
        tema: "Economico",
        modalidad: 'virtual',
        fecha: "03/02/2023",
        comentarios: `tengo problemas para el pago del semestre.`,
            status: 'aceptada',
      },

      {
        tema: "residencias",
        modalidad: 'presencial',
        fecha: "07/02/2023",
        comentarios: `pregunta sobre las residencias`,
            status: 'enviada',
          },
  ];

  generatePDF() {
    // aquí puedes implementar la lógica para generar un PDF
    // utilizando una biblioteca como jsPDF o pdfmake
  }

  ngOnInit() {
    // aquí puedes llamar a un servicio para obtener las solicitudes del tutorado
    // y asignarlas al dataSource       

      }
  }