import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesBuyComponent } from './succes-buy.component';

describe('SuccesBuyComponent', () => {
  let component: SuccesBuyComponent;
  let fixture: ComponentFixture<SuccesBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
