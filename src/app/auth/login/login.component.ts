import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router} from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //variables
  registerUser!: FormGroup;
  loginUser!:FormGroup;
  loading:boolean=false;


  constructor(private afAuth:AngularFireAuth,
    private fb:FormBuilder,private snackBar:MatSnackBar,
    private router:Router,
    private firebaseErrors:FirebaseCodeErrorsService){
       //form reactive register
      this.registerUser = this.fb.group({
      email :['',[Validators.required, Validators.email]],
      password :['',[Validators.required, Validators.minLength(6)]],
      repeatPassword :['',Validators.required],
      });
    //form reactive login
      this.loginUser = this.fb.group({
        logemail :['',[Validators.required, Validators.email]],
        logpassword :['',Validators.required],
        })
   }

   //registration method
   register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;

    console.log(this.registerUser);
    if(password!=repeatPassword){
      this.snackBar.open('Contrasena deben coincidir','',{duration:1000});
      return;
    }
    this.loading = true;
     this.afAuth.createUserWithEmailAndPassword(email,password).then(()=>{
      this.verificarCorreo();
    }).catch((err)=>{
      this.loading = false;
      this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
    })
  }


  verificarCorreo() {
    this.afAuth.currentUser.then((user) => user?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email']);
        this.snackBar.open( 'Le enviamos un correo electronico para su verificacion','Aceptar'
        );
      });
    }

  //login method
   login() {
    const email = this.loginUser.value.logemail;
    const password = this.loginUser.value.logpassword;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/verify-email'])
      }
    }).catch((err) => {
      this.loading = false;
      this.snackBar.open(this.firebaseErrors.codeError(err.code), 'Aceptar');
    })
  }
}
