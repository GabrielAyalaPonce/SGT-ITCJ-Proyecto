import { Injectable, NgZone, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackService {

  timeout: any;
  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone, private snackBar: MatSnackBar, @Inject(DOCUMENT) private document: Document) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario acaba de iniciar sesión
        this.startTimer();
      } else {
        // El usuario acaba de cerrar sesión
        this.clearTimer();
      }
    });

    // Reiniciar el temporizador cada vez que se detecta actividad del usuario
    this.document.body.addEventListener('click', () => this.resetTimer());
    this.document.body.addEventListener('mousemove', () => this.resetTimer());
    this.document.body.addEventListener('keypress', () => this.resetTimer());
  }

  startTimer() {
    // No iniciar el temporizador si la ruta actual es '/login'
    if (this.router.url === '/login') { 
    }else{
    this.clearTimer();
    this.timeout = setTimeout(() => {
      this.ngZone.run(() => {
        sessionStorage.removeItem('welcomeMessageShown');
        this.afAuth.signOut();
        this.snackBar.open('¡Tu sesion caduco, inicia sesion nuevamente!', 'Aceptar');
        this.router.navigate(['/login']);
      });
    },300000); // 5 minutos
  }
  }

  clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  resetTimer() {
    this.startTimer();
  }
}
