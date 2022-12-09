import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';
import { AngularFirestore, } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //variables
  public registerUser!: FormGroup;
  public loginUser!: FormGroup;
  public loading: boolean = false;
  public UserDocument:any;


  constructor(private afAuth: AngularFireAuth,
    private firestore:AngularFirestore,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private router: Router,
    private firebaseErrors: FirebaseCodeErrorsService,) {
    
    //form reactive register
    this.registerUser = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      Ncontrol: ['', [Validators.required]],
    });

    //form reactive login
    this.loginUser = this.fb.group({
      logemail: ['', [Validators.required, Validators.email]],
      logpassword: ['', Validators.required],
    })
  }

  
  


//   register() {
//     this.afAuth.auth.createUserWithEmailAndPassword(User.email, User.password)
//       .then((user) => {
//         this.verificarCorreo(); 
//         this.firestore.collection('users').add({
//           name: this.registerUser.value.name,
//           email: user.email,
//           controlNumber: this.registerUser.value.controlNumber
//         });
//       })
//       .catch((err) => {
//         this.loading = false;
//       this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
//       });
//   }
// }




  //registration method
  register()  {
    const User:any ={
      email:this.registerUser.value.email,
      password : this.registerUser.value.password,
      repeatPassword :this.registerUser.value.repeatPassword,
      name: this.registerUser.value.name,
      uid :this.registerUser.value.uid,
      Ncontrol: this.registerUser.value.Ncontrol
   }
    if (User.password != User.repeatPassword) {
      this.snackBar.open('Contrasena deben coincidir', '', { duration: 1000 });
    }
    this.loading = true;
    
    this.afAuth.createUserWithEmailAndPassword(User.email, User.password)
    .then((user) => {
      this.firestore.collection('users').add({
        id: user.user?.uid,
        name: User.name,
        password: User.password,
        email: User.email,
        controlNumber: User.Ncontrol
      });
      this.verificarCorreo(); 
    })
    .catch((err) => {
      this.loading = false;
    this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
    });
}
  

  verificarCorreo() {
    this.afAuth.currentUser.then((user) => user?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email']);
        this.snackBar.open('Le enviamos un correo electronico para su verificacion', 'Aceptar'
        );
      });
  }

  //login method
  login() {
    const email = this.loginUser.value.logemail;
    const password = this.loginUser.value.logpassword;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user)=> {
      if (user.user?.emailVerified) {
        this.router.navigate(['/pages'])
      } else {
        this.router.navigate(['/verify-email'])
      }
    }).catch((err) => {
      this.loading = false;
      this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
    })

    

  }


  

}


