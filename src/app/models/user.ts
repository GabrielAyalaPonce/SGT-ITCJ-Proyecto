export interface User {
   name: any,
   email:any,
   password:any,
   repeatPassword: any,
   uid:any;
   Ncontrol:any,
   Rol: 'administrador'|'coordinador'|'tutor'|'tutorado'; 
   subscribed?: boolean; 
}

