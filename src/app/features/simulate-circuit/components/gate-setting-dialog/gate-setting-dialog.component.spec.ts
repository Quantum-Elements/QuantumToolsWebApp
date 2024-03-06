import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateSettingDialogComponent } from './gate-setting-dialog.component';

describe('GateSettingDialogComponent', () => {
  let component: GateSettingDialogComponent;
  let fixture: ComponentFixture<GateSettingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GateSettingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
