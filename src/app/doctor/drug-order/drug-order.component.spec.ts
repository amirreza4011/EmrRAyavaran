import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugOrderComponent } from './drug-order.component';

describe('DrugOrderComponent', () => {
  let component: DrugOrderComponent;
  let fixture: ComponentFixture<DrugOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
