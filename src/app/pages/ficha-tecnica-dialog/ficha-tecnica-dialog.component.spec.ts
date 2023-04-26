import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTecnicaDialogComponent } from './ficha-tecnica-dialog.component';

describe('FichaTecnicaDialogComponent', () => {
  let component: FichaTecnicaDialogComponent;
  let fixture: ComponentFixture<FichaTecnicaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaTecnicaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaTecnicaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
