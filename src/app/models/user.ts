import { FichaTecnica } from "./ficha-tecnica";

export interface User {
   name: any,
   email:any,
   password:any,
   repeatPassword: any,
   uid:any;
   Ncontrol:any,
   fichaTecnica?: FichaTecnica; 
   Rol: 'administrador'|'coordinador'|'tutor'|'tutorado'; 
   subscribed?: boolean; 
   token?: string;  
}

