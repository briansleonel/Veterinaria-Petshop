import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesBuysComponent } from './succes-buys.component';

describe('SuccesBuysComponent', () => {
  let component: SuccesBuysComponent;
  let fixture: ComponentFixture<SuccesBuysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesBuysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesBuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
