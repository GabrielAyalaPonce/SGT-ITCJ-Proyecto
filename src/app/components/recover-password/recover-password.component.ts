import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverUser!: FormGroup;
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar:MatSnackBar,
    private firebaseErrors: FirebaseCodeErrorsService
  ) {
    this.recoverUser = this.fb.group({
      recemail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  recover() {
    const email = this.recoverUser.value.recemail;
    this.loading = true;
    console.log(email)
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.snackBar.open('Le enviamos un correo para restablecer su password', 'Aceptar')
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        this.loading = false;
        this.snackBar.open(this.firebaseErrors.codeError(err.code), 'exit');
      });
  }

}
