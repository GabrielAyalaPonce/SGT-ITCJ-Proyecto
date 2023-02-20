export interface TutorRequest {
    id?: string;
    fecha: Date;
    tema: string;
    modalidad: string;
    descripcion: string;
    archivo?: File;
    uid:any
  }
  