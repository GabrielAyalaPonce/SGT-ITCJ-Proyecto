import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'recover-password', component:RecoverPasswordComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: '**',redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
