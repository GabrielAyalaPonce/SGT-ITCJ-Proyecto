import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTutorComponent } from './package-tutor.component';

describe('PackageTutorComponent', () => {
  let component: PackageTutorComponent;
  let fixture: ComponentFixture<PackageTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
