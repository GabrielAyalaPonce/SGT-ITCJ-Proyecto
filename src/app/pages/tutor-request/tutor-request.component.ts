import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-request',
  templateUrl: './tutor-request.component.html',
  styleUrls: ['./tutor-request.component.css']
})
export class TutorRequestComponent implements OnInit {

  selectedFile: File | undefined = undefined;

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedFile = fileInput.files[0];
    }
  }
  tema:string | undefined;
  constructor() { }

  ngOnInit(): void {


  }

}
