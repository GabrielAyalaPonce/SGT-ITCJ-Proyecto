import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioEconomicStudyComponent } from './socio-economic-study.component';

describe('SocioEconomicStudyComponent', () => {
  let component: SocioEconomicStudyComponent;
  let fixture: ComponentFixture<SocioEconomicStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocioEconomicStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioEconomicStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
