import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuditComponent } from './qudit.component';

describe('QuditComponent', () => {
  let component: QuditComponent;
  let fixture: ComponentFixture<QuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
