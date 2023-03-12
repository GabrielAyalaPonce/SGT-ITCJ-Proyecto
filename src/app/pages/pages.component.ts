import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserFirebaseService } from '../services/user-firebase.service';
import { NavigationEnd } from '@angular/router';
import { ElementRef,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnDestroy  {

  users!: User[];
  
  public year = new Date().getFullYear();

 hidden = false;
  showFiller = false;
  panelOpenState = false;
  login:boolean = false;
  rol: 'administrador' | 'coordinador' | 'tutor' | 'tutorado' | undefined; 
  name: string='';
  subscription: any;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private userfirebase:UserFirebaseService,
    private elementRef: ElementRef
    ) { 
    this.userfirebase.stateUser().subscribe(resp=>{
      if(resp){
        console.log('esta logeado')
        this.login = true;
        this.getDatosUser(resp.uid)
      }else{
        console.log('No esta logeado')
        this.login = false;
      }
    })
    }


 
   

   //obtener un solo usuario por el uid para mostrar nombre. 
  getDatosUser(uid: string){
   const id = uid;
   this.userfirebase.getDoc<User>('users', id).subscribe(resp => {
    console.log('datos',resp)
    var myData = resp;
    if(resp){
      this.rol = resp.Rol;
      this.name = resp.name;
    }
  })


  }
// function logout session
  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
    this.snackBar.open('Sesion finalizada', 'Aceptar');
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }


  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url !== '/pages') {
        // Ocultar el div si la ruta actual no es /pages
        const container = this.elementRef.nativeElement.querySelector('.container-card-welcome');
        if (container) {
          container.style.display = 'none';
        }
      } else {
        // Mostrar el div si la ruta actual es /pages
        const container = this.elementRef.nativeElement.querySelector('.container-card-welcome');
        if (container) {
          container.style.display = 'block';
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



