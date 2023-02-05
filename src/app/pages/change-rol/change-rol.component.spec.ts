import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRolComponent } from './change-rol.component';

describe('ChangeRolComponent', () => {
  let component: ChangeRolComponent;
  let fixture: ComponentFixture<ChangeRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
