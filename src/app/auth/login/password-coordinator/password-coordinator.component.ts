import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-password-coordinator',
  templateUrl: './password-coordinator.component.html',
  styleUrls: ['./password-coordinator.component.css']
})
export class PasswordCoordinatorComponent {

  password: string | undefined;

  constructor(public dialogRef: MatDialogRef<PasswordCoordinatorComponent>) { }


}
