import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { QuestionComponent } from './pages/question/question.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';


const routes: Routes = [

  {path: 'pages', 
  component:PagesComponent,
  children:[
    {path: 'pages/dashboard', component:DashboardComponent},
    {path: 'pages/page-questions', component:QuestionComponent},
    {path: 'pages/usuarios', component:UsuariosComponent},
    {path: 'pages/crear-usuarios', component:CrearUsuariosComponent},
    {path: '',redirectTo: 'dashboard', pathMatch:'full'},
  ]},
  
  {path: 'login', component: LoginComponent},
   {path: 'recover-password', component:RecoverPasswordComponent},
   {path: 'verify-email', component:VerifyEmailComponent},
   {path: '', component: LoginComponent},
  {path: '**',redirectTo: 'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }    
