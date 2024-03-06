import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuditSettingsComponent } from './qudit-settings.component';

describe('QuditSettingsComponent', () => {
  let component: QuditSettingsComponent;
  let fixture: ComponentFixture<QuditSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuditSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuditSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
