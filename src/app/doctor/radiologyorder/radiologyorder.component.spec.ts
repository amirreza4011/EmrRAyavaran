import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyorderComponent } from './radiologyorder.component';

describe('RadiologyorderComponent', () => {
  let component: RadiologyorderComponent;
  let fixture: ComponentFixture<RadiologyorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
