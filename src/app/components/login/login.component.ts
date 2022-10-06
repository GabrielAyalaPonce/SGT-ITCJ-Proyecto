import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!:string;
  password!:string;
  registerUser!: FormGroup;



  constructor(private afAuth:AngularFireAuth, private fb:FormBuilder,private snackBar:MatSnackBar,) {
      this.registerUser = this.fb.group({
      email :['',Validators.required],
      password :['',Validators.required],
      repeatPassword :['',Validators.required],
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
      this.snackBar.open('Usuario registrado','',{duration:1000})
    }

    this.afAuth.createUserWithEmailAndPassword(email,password).then((user)=>{
      console.log(user)
    }).catch((err)=>{
      console.log(err)
    })

    console.log(email,password,repeatPassword);
  }
  login() {
    if(this.email=="admin" && this.password=="admin"){
        this.snackBar.open('Login Successful','',{duration:1000})
    }else{
      this.snackBar.open('Login error','',{duration:1000})
    }



}}
