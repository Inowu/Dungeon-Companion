import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPaymentComponent } from './master-payment.component';

describe('MasterPaymentComponent', () => {
  let component: MasterPaymentComponent;
  let fixture: ComponentFixture<MasterPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
