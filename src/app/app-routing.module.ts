import { Component, createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { QuestionComponent } from './pages/question/question.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ChangeRolComponent } from './pages/change-rol/change-rol.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { TutorRequestComponent } from './pages/tutor-request/tutor-request.component';
import { TutorHistoryComponent } from './pages/tutor-history/tutor-history.component';
import { StudentRequestsComponent } from './pages/student-requests/student-requests.component';
import { AcademicPortafoliosTutorComponent } from './pages/academic-portafolios-tutor/academic-portafolios-tutor.component';
import { AlertSummaryComponent } from './pages/alert-summary/alert-summary.component';
import { CreatePackageComponent } from './pages/create-package/create-package.component';
import { ViewPackagesComponent } from './pages/view-packages/view-packages.component';
import { PackageTutorComponent } from './pages/package-tutor/package-tutor.component';
import { AuthGuard } from './guards/auth.guard';
import { ViewPackagesTutoradoComponent } from './pages/view-packages-tutorado/view-packages-tutorado.component';
import { PackageOwnInformationComponent } from './pages/package-own-information/package-own-information.component';
import { SocioEconomicStudyComponent } from './pages/tab-identifiation-tutored/socio-economic-study/socio-economic-study.component';
import { TutoredInterviewComponent } from './pages/tab-identifiation-tutored/tutored-interview/tutored-interview.component';


const routes: Routes = [

  {path: 'pages', 
  canActivate: [AuthGuard],
  component:PagesComponent,
  children:[
    {path: 'pages/dashboard', component:DashboardComponent},
    {path: 'pages/page-questions', component:QuestionComponent},
    {path: 'pages/usuarios', component:UsuariosComponent},
    {path: 'pages/create-user', component:CreateUserComponent},
    {path: 'pages/perfil', component:PerfilComponent},
    {path: 'pages/change-rol', component:ChangeRolComponent},
    {path: 'pages/delete-user', component:DeleteUserComponent},
    {path: 'pages/tutor-request', component:TutorRequestComponent},
    {path: 'pages/EstudioSocioeconomico', component:SocioEconomicStudyComponent},
    {path: 'pages/Entrevista-tutor', component:TutoredInterviewComponent},
    {path: 'pages/tutor-history', component:TutorHistoryComponent},
    {path: 'pages/student-requests', component:StudentRequestsComponent},
    {path: 'pages/academic-portafolios-tutor', component:AcademicPortafoliosTutorComponent},
    {path: 'pages/alert-summary', component:AlertSummaryComponent},
    {path: 'pages/create-package', component:CreatePackageComponent},
    {path: 'pages/view-packages', component:ViewPackagesComponent},
    {path: 'pages/view-packages-tutor', component:PackageTutorComponent},
    {path: 'pages/view-packages-tutorado', component:ViewPackagesTutoradoComponent},
    {path: 'pages/package-own-information', component:PackageOwnInformationComponent},
    {path: '',redirectTo: 'dashboard', pathMatch:'full'},
  ]},
{path: 'login', component: LoginComponent},
{path: 'recover-password', component:RecoverPasswordComponent},
{path: 'verify-email', component:VerifyEmailComponent},
{path: '**',redirectTo: 'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }    
