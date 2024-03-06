import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateCircuitComponent } from './simulate-circuit.component';

describe('SimulateCircuitComponent', () => {
  let component: SimulateCircuitComponent;
  let fixture: ComponentFixture<SimulateCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimulateCircuitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulateCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
