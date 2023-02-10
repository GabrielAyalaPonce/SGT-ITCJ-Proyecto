import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserFirebaseService } from '../services/user-firebase.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  public year = new Date().getFullYear();

 hidden = false;
  showFiller = false;
  panelOpenState = false;
  login:boolean = false;
  rol: 'administrador' | 'cordinador' | 'tutor' | 'tutorado' | undefined; 
  name: string='';

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private firestore:AngularFirestore,
    private userfirebase:UserFirebaseService
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

  ngOnInit(): void {

  }

    
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

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
    this.snackBar.open('Sesion finalizada', 'Aceptar');
  }


  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}

