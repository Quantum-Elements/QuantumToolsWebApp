import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BathDialogComponent } from './bath-dialog.component';

describe('BathDialogComponent', () => {
  let component: BathDialogComponent;
  let fixture: ComponentFixture<BathDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BathDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BathDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
