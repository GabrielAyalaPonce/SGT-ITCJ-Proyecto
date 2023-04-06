import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';
import { User } from 'src/app/models/user';
import { UserFirebaseService } from 'src/app/services/user-firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordCoordinatorComponent } from './password-coordinator/password-coordinator.component';


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
  public emailUser: any;
  public disabled:boolean=false;
  public showMessage:boolean = false;
  public newRol:string | undefined;

  datos: User = {
   name: null,
   email:null,
   password:null,
   repeatPassword: null,
   uid: null,
   Ncontrol:null,
   Rol:'tutorado'
  }

  constructor(private afAuth: AngularFireAuth,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private router: Router,
    private firebaseErrors: FirebaseCodeErrorsService,
    private userfirebase: UserFirebaseService,
    public dialog: MatDialog) {
    
    //form reactive register
    this.registerUser = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      uid: ['', Validators.required],
      Ncontrol: ['', [Validators.required]],
      Rol: ['tutorado', Validators.required],
    });

    //form reactive login
    this.loginUser = this.fb.group({
      logemail: ['', [Validators.required, Validators.email]],
      logpassword: ['', Validators.required],
    })
  }





  //registration method 1
  register()  {
    this.datos ={
      email:this.registerUser.value.email,
      password : this.registerUser.value.password,
      repeatPassword :this.registerUser.value.repeatPassword,
      name: this.registerUser.value.name,
      uid : '',
      Ncontrol: this.registerUser.value.Ncontrol,
      Rol: this.datos.Rol
   }
    if (this.datos.password != this.datos.repeatPassword) {
      this.snackBar.open('Contrasena deben coincidir', '', { duration: 1000 });
      return;
    }
    this.loading = true;
    
  this.afAuth.createUserWithEmailAndPassword(this.datos.email, this.datos.password).then( (resp) => {
    this.datos ={
      email:this.registerUser.value.email,
      password : "",
      repeatPassword :"",
      name: this.registerUser.value.name,
      uid : resp.user?.uid,
      Ncontrol: this.registerUser.value.Ncontrol,
      Rol: this.datos.Rol   
    }
      this.userfirebase.createDoc(this.datos,'users',resp.user?.uid);
    this.verificarCorreo(); 
  }).catch((err) => {
    this.loading = false;
  this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
  });
}

openDialog(): void {
  const dialogRef = this.dialog.open(PasswordCoordinatorComponent, {});
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'SGT2022') {
      this.disabled = true;
      this.datos.Rol = 'coordinador';
    } else {
      this.showMessage = true;
    }
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
      this.emailUser = user.user?.email
    }).catch((err) => {
      this.loading = false;
      this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
    })

  }  


}


