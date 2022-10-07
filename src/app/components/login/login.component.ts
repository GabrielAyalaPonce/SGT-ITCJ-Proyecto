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

  email!:string;
  password!:string;
  logemail!:string;
  logpassword!:string;
  registerUser!: FormGroup;
  loginUser!:FormGroup;
  loading:boolean=false;


  constructor(private afAuth:AngularFireAuth, private fb:FormBuilder,private snackBar:MatSnackBar,private router:Router,  private firebaseErrors:FirebaseCodeErrorsService ) {
      this.registerUser = this.fb.group({
      email :['',Validators.required],
      password :['',Validators.required],
      repeatPassword :['',Validators.required],
      });
      this.loginUser = this.fb.group({
        logemail :['',Validators.required],
        logpassword :['',Validators.required],
        })
   }
   register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;
    if(password!=repeatPassword){
      this.snackBar.open('Contrasena deben coincidir','',{duration:1000})
    }
    else{
      this.snackBar.open('Usuario registrado con exito!!','',{duration:1000})
    }
    this.loading = true;
     this.afAuth.createUserWithEmailAndPassword(email,password).then(()=>{
      this.router.navigate(['/login'])
    }).catch((err)=>{
      this.loading = false;
      console.log(err)
      this.snackBar.open(this.firebaseErrors.codeError(err.code), 'exit');
    })

    console.log(email,password,repeatPassword);
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }
    }).catch((err) => {
      this.loading = false;
      this.snackBar.open(this.firebaseErrors.codeError(err.code), 'exit');
    })
  }

}
