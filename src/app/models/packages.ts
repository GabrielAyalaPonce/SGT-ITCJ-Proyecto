import { User } from "./user";

export interface PackageI {
    post: boolean;
    subscribed: boolean;
    id: string;
    keyAuthorization: string;
    nombrePaquete: string;
    NombreCarrera: string;
    tutoradospkg?: User[];
    TutorAsignado: {
      name: string;
      email: string;
      post:boolean;
    };
    subjectsAndSchedules: Array<{
      subject: string;
      schedule: string;
      teacher: string;
      grade?: number;
    }>;
    toDelete?: boolean;
  }
  