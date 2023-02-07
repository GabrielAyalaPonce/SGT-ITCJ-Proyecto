import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioeconomicDataComponent } from './socioeconomic-data.component';

describe('SocioeconomicDataComponent', () => {
  let component: SocioeconomicDataComponent;
  let fixture: ComponentFixture<SocioeconomicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocioeconomicDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioeconomicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
