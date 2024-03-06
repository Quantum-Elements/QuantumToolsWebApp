import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityGraphComponent } from './probability-graph.component';

describe('ProbabilityGraphComponent', () => {
  let component: ProbabilityGraphComponent;
  let fixture: ComponentFixture<ProbabilityGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProbabilityGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProbabilityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
