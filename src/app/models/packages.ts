export interface PackageI {
    id: string;
    nombrePaquete: string;
    NombreCarrera: string;
    TutorAsignado: {
      name: string;
      email: string;
    };
    subjectsAndSchedules: Array<{
      subject: string;
      schedule: string;
      teacher: string;
    }>;
    toDelete?: boolean;
  }
  