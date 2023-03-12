import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSummaryComponent } from './alert-summary.component';

describe('AlertSummaryComponent', () => {
  let component: AlertSummaryComponent;
  let fixture: ComponentFixture<AlertSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
