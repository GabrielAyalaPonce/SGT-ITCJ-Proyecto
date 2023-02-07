export interface User {
   name: any,
   email:any,
   password:any,
   repeatPassword: any,
   uid:any;
   Ncontrol:any,
   Rol: 'administrador'|'cordinador'|'tutor'|'tutorado'; 
}



export interface solicitud{
   tema:any, 
   modalidad:any, 
   fecha:any,
   comentarios:any, 
   status:any
}
