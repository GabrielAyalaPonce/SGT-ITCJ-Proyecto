import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// import { userfirebase } from '../services/user-firebase.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  @Input() public userinput:any = 'Sin nombre';
  
  public year = new Date().getFullYear();
  

  showFiller = false;
  panelOpenState = false;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private firestore:AngularFirestore,

    // private userfirebase: userfirebase,
    ) { }

  ngOnInit(): void {
    this.firestore.collection('users').get().subscribe(usersSnapshot => {
      console.log('usersnapshot',usersSnapshot);
      usersSnapshot.forEach((idField) => {
        console.log('userDoc',idField)
      });
  })
  }
  

  // getUsername():Observable<User[]> {
  //   const refUser = collection(this.firestore,'users');
  //   return collectionData(refUser, { idField: 'id' }) as Observable<User[]>;
  // } 

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
    this.snackBar.open('Sesion finalizada', 'Aceptar');
  }

}
