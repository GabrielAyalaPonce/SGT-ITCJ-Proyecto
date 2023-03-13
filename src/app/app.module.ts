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
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';



import { CreateUserComponent } from './pages/create-user/create-user.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ChangeRolComponent } from './pages/change-rol/change-rol.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { TutorRequestComponent } from './pages/tutor-request/tutor-request.component';
import { FichaIdentificacionTutoradoComponent } from './pages/Ficha-identificacion-tutorado/ficha-identificacion-tutorado.component';
import { TutorHistoryComponent } from './pages/tutor-history/tutor-history.component';
import { StudentRequestsComponent } from './pages/student-requests/student-requests.component';
import { AcademicPortfolioComponent } from './pages/academic-portfolio/academic-portfolio.component';
import { AcademicPortafoliosTutorComponent } from './pages/academic-portafolios-tutor/academic-portafolios-tutor.component';
import { PasswordCoordinatorComponent } from './auth/login/password-coordinator/password-coordinator.component';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { AlertSummaryComponent } from './pages/alert-summary/alert-summary.component';
import { CreatePackageComponent } from './pages/create-package/create-package.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ViewPackagesComponent } from './pages/view-packages/view-packages.component';
import { ViewPackageComponent } from './pages/view-package/view-package.component';




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
    CreateUserComponent,
    PerfilComponent,
    ChangeRolComponent,
    DeleteUserComponent,
    TutorRequestComponent,
    TutorHistoryComponent,
    StudentRequestsComponent,
    AcademicPortfolioComponent,
    AcademicPortafoliosTutorComponent,
    PasswordCoordinatorComponent,
    FichaIdentificacionTutoradoComponent,
    UsersFilterPipe,
    AlertSummaryComponent,
    CreatePackageComponent,
    ViewPackagesComponent,
    ViewPackageComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatBadgeModule,
    MatDialogModule,
    MatRadioModule, 
    MatSortModule, 
    MatStepperModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
