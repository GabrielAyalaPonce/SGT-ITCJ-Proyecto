import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackagesTutoradoComponent } from './view-packages-tutorado.component';

describe('ViewPackagesTutoradoComponent', () => {
  let component: ViewPackagesTutoradoComponent;
  let fixture: ComponentFixture<ViewPackagesTutoradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPackagesTutoradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPackagesTutoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
