import { User } from "./user";

export interface PackageI {
    post: boolean;
    subscribed: boolean;
    id: string;
    keyAuthorization: string;
    nombrePaquete: string;
    NombreCarrera: string;
    tutoradospkg?: User[];
    TutorAsignado:string;
    infoTutor:any
    tutorInfo?: User;
    subjectsAndSchedules: Array<{
      subject: string;
      schedule: string;
      teacher: string;
      grade?: number;
    }>;

    toDelete?: boolean;
  }