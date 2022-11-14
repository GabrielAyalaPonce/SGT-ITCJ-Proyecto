
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  mostrarRespuesta(): void {
    let answers = document.querySelectorAll(".accordion");
    
    answers.forEach((event) => {
      event.addEventListener("click", () => {
        const itemActive = document.querySelectorAll(".accordion.active")[0];
        if (event.classList.contains("active")) {
          event.classList.remove("active");
        } else {
          event.classList.add("active");
          if(itemActive){
            itemActive.classList.remove("active")
            }
        }
      });
    });
  }
 
}
