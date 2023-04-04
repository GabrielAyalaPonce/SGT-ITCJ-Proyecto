import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-courses-and-schedules',
  templateUrl: './courses-and-schedules.component.html',
  styleUrls: ['./courses-and-schedules.component.css']
})
export class CoursesAndSchedulesComponent implements OnInit {
  courseForm: FormGroup;
  subjects: { name: string, schedule: string, professor: string }[] = [];
  subjectForms: FormGroup[] = [];

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      subjectName: ['', Validators.required],
      schedule: ['', Validators.required],
      professor: ['', Validators.required]
    });

    this.addSubjectForm();
  }

  ngOnInit(): void { }

  addSubjectForm(): void {
    const subjectForm = this.fb.group({
      subjectName: ['', Validators.required],
    });
    this.subjectForms.push(subjectForm);
  }

  addSubject(): void {
    if (this.courseForm.get('subjectName')?.valid && this.courseForm.get('schedule')?.valid && this.courseForm.get('professor')?.valid) {
      this.subjects.push({
        name: this.courseForm.get('subjectName')?.value,
        schedule: this.courseForm.get('schedule')?.value,
        professor: this.courseForm.get('professor')?.value
      });
      this.courseForm.patchValue({ subjectName: '', schedule: '', professor: '' });
    }
  }

  getSubjectNameFormControl(subjectForm: FormGroup): FormControl {
    return subjectForm.get('subjectName') as FormControl;
  }

  saveCourseAndSubjects(): void {
    if (this.courseForm.valid && this.subjects.length > 0) {
      const courseName = this.courseForm.get('courseName')?.value;
      const courseData = {
        name: courseName,
        subjects: this.subjects
      };
      
      this.db.list('courses').push(courseData).then(() => {
        this.courseForm.reset();
        this.subjects = [];
        this.subjectForms = [];
        this.addSubjectForm();
        alert('Carrera y materias guardadas con éxito');
      }).catch((error) => {
        console.error('Error al guardar carrera y materias:', error);
        alert('Hubo un error al guardar la carrera y las materias. Por favor, inténtelo de nuevo.');
      });
    }
  }
}