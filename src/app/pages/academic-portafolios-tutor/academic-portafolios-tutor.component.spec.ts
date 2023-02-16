import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPortafoliosTutorComponent } from './academic-portafolios-tutor.component';

describe('AcademicPortafoliosTutorComponent', () => {
  let component: AcademicPortafoliosTutorComponent;
  let fixture: ComponentFixture<AcademicPortafoliosTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicPortafoliosTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicPortafoliosTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
