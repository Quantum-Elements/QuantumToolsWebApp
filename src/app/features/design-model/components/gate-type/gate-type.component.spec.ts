import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateTypeComponent } from './gate-type.component';

describe('GateTypeComponent', () => {
  let component: GateTypeComponent;
  let fixture: ComponentFixture<GateTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GateTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
