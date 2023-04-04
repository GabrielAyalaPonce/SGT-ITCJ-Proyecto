import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAndSchedulesComponent } from './courses-and-schedules.component';

describe('CoursesAndSchedulesComponent', () => {
  let component: CoursesAndSchedulesComponent;
  let fixture: ComponentFixture<CoursesAndSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesAndSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesAndSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
