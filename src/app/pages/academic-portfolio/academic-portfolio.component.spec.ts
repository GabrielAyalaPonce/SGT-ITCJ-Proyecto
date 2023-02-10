import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPortfolioComponent } from './academic-portfolio.component';

describe('AcademicPortfolioComponent', () => {
  let component: AcademicPortfolioComponent;
  let fixture: ComponentFixture<AcademicPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicPortfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
