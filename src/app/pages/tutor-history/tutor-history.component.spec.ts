import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorHistoryComponent } from './tutor-history.component';

describe('TutorHistoryComponent', () => {
  let component: TutorHistoryComponent;
  let fixture: ComponentFixture<TutorHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
