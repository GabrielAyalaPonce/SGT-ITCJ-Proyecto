import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-portfolio',
  templateUrl: './academic-portfolio.component.html',
  styleUrls: ['./academic-portfolio.component.css']
})
export class AcademicPortfolioComponent implements OnInit {
 
  semestres = [9];
  panelOpenState = false;

  addSemestre() {
    this.semestres.push(this.semestres[this.semestres.length - 1] + 1);
  }
 
  constructor() { }

  ngOnInit(): void {
    
  }
}
