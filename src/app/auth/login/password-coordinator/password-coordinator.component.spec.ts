import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCoordinatorComponent } from './password-coordinator.component';

describe('PasswordCoordinatorComponent', () => {
  let component: PasswordCoordinatorComponent;
  let fixture: ComponentFixture<PasswordCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordCoordinatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
