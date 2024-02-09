import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatePulseComponent } from './gate-pulse.component';

describe('GatePulseComponent', () => {
  let component: GatePulseComponent;
  let fixture: ComponentFixture<GatePulseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatePulseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GatePulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
