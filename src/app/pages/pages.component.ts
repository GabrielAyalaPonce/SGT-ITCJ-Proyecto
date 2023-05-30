import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { User } from '../models/user';
import { UserFirebaseService } from '../services/user-firebase.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  users!: User[];
  showContainer: boolean = true;

  public year = new Date().getFullYear();
  hidden = false;
  showFiller = false;
  panelOpenState = false;
  login:boolean = false;
  rol: 'administrador' | 'coordinador' | 'tutor' | 'tutorado' | any; 
  name: string='';
  navigated: boolean = false;
  filteredRoutes: any[] = [];
  
  routes = [
    // { path: 'pages/pages/perfil', label: 'Perfil', roles: ['administrador', 'tutor', 'coordinador', 'tutorado'] },
    { path: 'pages/pages/usuarios', label: 'Usuarios', roles: ['administrador', 'tutor', 'coordinador'] },
    { path: 'pages/pages/create-user', label: 'Crear Usuarios', roles: ['administrador'] },
    { path: 'pages/pages/change-rol', label: 'Cambiar rol', roles: ['administrador', 'coordinador'] },
    { path: 'pages/pages/create-package', label: 'Crear paquete', roles: ['coordinador'] },
    { path: 'pages/pages/view-packages', label: 'Ver Paquetes', roles: ['coordinador'] },
    { path: 'pages/pages/delete-user', label: 'Eliminar usuario', roles: ['administrador'] },
    { path: 'pages/pages/database', label: 'Informacion de Base datos', roles: ['administrador'] },
    { path: 'pages/pages/FichaIdentificacionTutoradoComponent', label: 'Ficha De identificacion', roles: ['tutorado'] },
    // { path: 'pages/pages/academic-portafolio', label: 'Seguimiento', roles: ['tutorado'] },
    { path: 'pages/pages/academic-portafolios-tutor', label: 'Reporte semestral', roles: ['tutor'] },
    { path: 'pages/pages/alert-summary', label: 'Resumen de alertas', roles: ['tutor'] },
    { path: 'pages/pages/view-packages-tutorado', label: 'Grupos', roles: ['tutorado'] },
    { path: 'pages/pages/package-own-information', label: 'Mi grupo', roles: ['tutorado'] },
    { path: 'pages/pages/view-packages-tutor', label: 'Paquetes', roles: ['tutor'] }
  ];
  
  
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private userfirebase:UserFirebaseService,
    private changeDetector: ChangeDetectorRef
  ) { 
    this.userfirebase.stateUser().subscribe(resp => {
      if(resp){
        // console.log('esta logeado')
        this.login = true;
        this.getDatosUser(resp.uid)
      }else{
        // console.log('No esta logeado')
        this.login = false;
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navigated = true;
        this.showContainer = false;
      }
    });
  }

  getDatosUser(uid: string){
    const id = uid;
    this.userfirebase.getDoc<User>('users', id).subscribe(resp => {
      // console.log('datos',resp)
      if(resp){
        this.rol = resp.Rol;
        this.name = resp.name;
        // console.log('Rutas:', this.routes);
        this.filteredRoutes = this.routes.filter(route => route.roles.includes(this.rol));
        // console.log('Rutas filtradas:', this.filteredRoutes);
      }
    });
  }

  
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
    this.snackBar.open('Sesion finalizada', 'Aceptar', { duration: 2000 });
    sessionStorage.removeItem('welcomeMessageShown');
    localStorage.removeItem('loginTimestamp');
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  ngOnInit() {
    this.showContainer = false;  // Aseguramos que 'showContainer' esté en 'false' por defecto
    if (!sessionStorage.getItem('welcomeMessageShown') && this.router.url !== '/login') {
      this.showContainer = true;
      this.changeDetector.detectChanges();
      sessionStorage.setItem('welcomeMessageShown', 'true');
    }
  }

}
