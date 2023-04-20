import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOwnInformationComponent } from './package-own-information.component';

describe('PackageOwnInformationComponent', () => {
  let component: PackageOwnInformationComponent;
  let fixture: ComponentFixture<PackageOwnInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageOwnInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageOwnInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
