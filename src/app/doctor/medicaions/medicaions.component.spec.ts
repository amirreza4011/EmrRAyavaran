import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaionsComponent } from './medicaions.component';

describe('MedicaionsComponent', () => {
  let component: MedicaionsComponent;
  let fixture: ComponentFixture<MedicaionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
