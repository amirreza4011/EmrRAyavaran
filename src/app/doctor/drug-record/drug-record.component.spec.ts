import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugRecordComponent } from './drug-record.component';

describe('DrugRecordComponent', () => {
  let component: DrugRecordComponent;
  let fixture: ComponentFixture<DrugRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
