import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouplingSettingsComponent } from './coupling-settings.component';

describe('CouplingSettingsComponent', () => {
  let component: CouplingSettingsComponent;
  let fixture: ComponentFixture<CouplingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouplingSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouplingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
