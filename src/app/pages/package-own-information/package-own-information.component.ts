import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PackagesService } from 'src/app/services/packages.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take } from 'rxjs/operators';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-package-own-information',
  templateUrl: './package-own-information.component.html',
  styleUrls: ['./package-own-information.component.css']
})
export class PackageOwnInformationComponent implements OnInit {
  paquetesAsignados: any[] = [];
  panelOpenState = false;
  currentUserUid: string | null = null;

  constructor(private firestore: AngularFirestore, private packagesService: PackagesService, private afAuth: AngularFireAuth) { }

  
  async saveGrade(packageId: string, subjectSchedule: any): Promise<void> {
    const grade = subjectSchedule.grade;
    if (grade === undefined || grade === null || grade < 0 || grade > 100) {
      Notiflix.Notify.failure('Ingrese una calificación válida (0-100)');
      return;
    }
  
    const currentUser = await this.afAuth.currentUser;
    if (!currentUser) {
      // console.error('No hay un usuario en sesión.');
      return;
    }
    this.currentUserUid = currentUser.uid;
  
    Notiflix.Confirm.show(
      'Confirmar calificación',
      'Una vez guardada, la calificación no se podrá cambiar. ¿Desea continuar?',
      'Sí',
      'No',
      async () => {
        const packageIndex = this.paquetesAsignados.findIndex((pkg: any) => pkg.docId === packageId);
        if (packageIndex >= 0) {
          const tutoradoIndex = this.paquetesAsignados[packageIndex].tutoradospkg.findIndex((tutorado: any) => tutorado.uid === this.currentUserUid);
  
          if (tutoradoIndex >= 0) {
            if (!this.paquetesAsignados[packageIndex].tutoradospkg[tutoradoIndex].grades) {
              this.paquetesAsignados[packageIndex].tutoradospkg[tutoradoIndex].grades = [];
            }
            const subjectIndex = this.paquetesAsignados[packageIndex].tutoradospkg[tutoradoIndex].grades.findIndex((ss: any) => ss.subject === subjectSchedule.subject && ss.schedule === subjectSchedule.schedule);
  
            if (subjectIndex >= 0) {
              this.paquetesAsignados[packageIndex].tutoradospkg[tutoradoIndex].grades[subjectIndex].grade = grade;
            } else {
              this.paquetesAsignados[packageIndex].tutoradospkg[tutoradoIndex].grades.push({
                ...subjectSchedule,
                grade: grade
              });
            }
          } else {
            this.paquetesAsignados[packageIndex].tutoradospkg.push({
              ...subjectSchedule,
              grade: grade,
              uid: this.currentUserUid
            });
          }
        }
  
        this.firestore.collection('packages').doc(packageId).update({
          tutoradospkg: this.paquetesAsignados[packageIndex].tutoradospkg
        }).then(() => {
          Notiflix.Notify.success('Calificación guardada con éxito');
          subjectSchedule.showGrade = false;
        }).catch(error => {
          // console.error('Error al guardar la calificación:', error);
        });
      },
      () => {
      }
    );
  }
  

  ngOnInit(): void {
    Notiflix.Notify.init({
      width: '50%',
      position:'center-center',
      fontSize: '1em',
      borderRadius: '5px',
      });

      this.packagesService.getPackages().subscribe(
      );
      
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const uid = user.uid;
          this.obtenerPaqueteAsignado(uid);
        } else {
          // console.error('No hay un usuario en sesión.');
        }
      });
    }

    obtenerPaqueteAsignado(uid: string): void {
      // console.log('UID:', uid);
      this.firestore.collection('packages').valueChanges({ idField: 'docId' })
        .pipe(take(1)) 
        .subscribe(packages => {
          packages.forEach((packageData: any) => {
            const tutorados = packageData.tutoradospkg || [];
            const matchedTutorado = tutorados.find((tutorado: any) => tutorado.uid === uid);
            if (matchedTutorado) {
  
              const grades = matchedTutorado.grades || [];
    
              const subjectsAndSchedules = packageData.subjectsAndSchedules.map((subjectSchedule: any) => {
                const gradeData = grades.find((grade: any) => grade.subject === subjectSchedule.subject && grade.schedule === subjectSchedule.schedule);
                return {
                  ...subjectSchedule,
                  showGrade: !gradeData,
                  grade: gradeData ? gradeData.grade : undefined
                };
              });
              this.paquetesAsignados.push({ ...packageData, docId: packageData.docId, subjectsAndSchedules });
              // console.log(this.paquetesAsignados);
            }
          });
        });
    }
    
  }    

