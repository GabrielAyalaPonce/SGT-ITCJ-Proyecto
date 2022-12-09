import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { QuestionComponent } from './pages/question/question.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
 

{path:'',component: PagesComponent,
   children:[ 
   {path: 'dashboard', component:DashboardComponent},
   {path: 'recover-password', component:RecoverPasswordComponent},
   {path: 'verify-email', component:VerifyEmailComponent},
   {path: 'page-questions', component:QuestionComponent},
   {path: 'dashboard/Usuarios', component:UsuariosComponent},
   {path: '**',redirectTo: 'dashboard', pathMatch:'full'}
  ]},

  {path: '**',redirectTo: 'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }    
