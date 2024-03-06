import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePrescriptionComponent } from './device-prescription.component';

describe('DevicePrescriptionComponent', () => {
  let component: DevicePrescriptionComponent;
  let fixture: ComponentFixture<DevicePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicePrescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevicePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
