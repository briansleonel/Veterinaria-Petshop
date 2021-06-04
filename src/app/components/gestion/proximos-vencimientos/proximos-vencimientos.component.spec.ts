import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosVencimientosComponent } from './proximos-vencimientos.component';

describe('ProximosVencimientosComponent', () => {
  let component: ProximosVencimientosComponent;
  let fixture: ComponentFixture<ProximosVencimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximosVencimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosVencimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
