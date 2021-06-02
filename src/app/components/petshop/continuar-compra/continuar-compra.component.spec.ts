import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuarCompraComponent } from './continuar-compra.component';

describe('ContinuarCompraComponent', () => {
  let component: ContinuarCompraComponent;
  let fixture: ComponentFixture<ContinuarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuarCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
