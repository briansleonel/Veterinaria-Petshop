import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEnvioComponent } from './seleccion-envio.component';

describe('SeleccionEnvioComponent', () => {
  let component: SeleccionEnvioComponent;
  let fixture: ComponentFixture<SeleccionEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
