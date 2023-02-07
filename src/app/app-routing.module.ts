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
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ChangeRolComponent } from './pages/change-rol/change-rol.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { DatabaseComponent } from './pages/database/database.component';
import { TutorRequestComponent } from './pages/tutor-request/tutor-request.component';
import { SocioeconomicDataComponent } from './pages/socioeconomic-data/socioeconomic-data.component';
import { TutorHistoryComponent } from './pages/tutor-history/tutor-history.component';
import { StudentRequestsComponent } from './pages/student-requests/student-requests.component';


const routes: Routes = [

  {path: 'pages', 
  component:PagesComponent,
  children:[
    {path: 'pages/dashboard', component:DashboardComponent},
    {path: 'pages/page-questions', component:QuestionComponent},
    {path: 'pages/usuarios', component:UsuariosComponent},
    {path: 'pages/crear-usuarios', component:CrearUsuariosComponent},
    {path: 'pages/perfil', component:PerfilComponent},
    {path: 'pages/change-rol', component:ChangeRolComponent},
    {path: 'pages/delete-user', component:DeleteUserComponent},
    {path: 'pages/database', component:DatabaseComponent},
    {path: 'pages/tutor-request', component:TutorRequestComponent},
    {path: 'pages/socioeconomic-data', component:SocioeconomicDataComponent},
    {path: 'pages/tutor-history', component:TutorHistoryComponent},
    {path: 'pages/student-requests', component:StudentRequestsComponent},
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
