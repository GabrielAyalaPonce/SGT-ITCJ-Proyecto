import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoredInterviewComponent } from './tutored-interview.component';

describe('TutoredInterviewComponent', () => {
  let component: TutoredInterviewComponent;
  let fixture: ComponentFixture<TutoredInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutoredInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoredInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
