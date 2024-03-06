import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignModelComponent } from './design-model.component';

describe('DesignModelComponent', () => {
  let component: DesignModelComponent;
  let fixture: ComponentFixture<DesignModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
