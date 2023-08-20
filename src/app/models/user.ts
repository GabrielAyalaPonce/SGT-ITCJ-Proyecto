import { FichaTecnica } from "./ficha-tecnica";
import { interviewTutoredI } from "./interview-tutored";

export interface User {
   name: any,
   email:any,
   password:any,
   repeatPassword: any,
   uid:any;
   Ncontrol:any,
   fichaTecnica?: any;
   interview?: any;
   Rol: 'administrador'|'coordinador'|'tutor'|'tutorado'; 
   subscribed?: boolean; 
   token?: string;  
}

