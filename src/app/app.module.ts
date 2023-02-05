import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import{AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { QuestionComponent } from './pages/question/question.component';
import { PagesComponent } from './pages/pages.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';



import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ChangeRolComponent } from './pages/change-rol/change-rol.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { DatabaseComponent } from './pages/database/database.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpinnerComponent,
    RecoverPasswordComponent,
    DashboardComponent,
    VerifyEmailComponent,
    QuestionComponent,
    PagesComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    PerfilComponent,
    ChangeRolComponent,
    DeleteUserComponent,
    DatabaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBadgeModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
