import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseDialogComponent } from './pulse-dialog.component';

describe('PulseDialogComponent', () => {
  let component: PulseDialogComponent;
  let fixture: ComponentFixture<PulseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PulseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PulseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
