import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabRecordComponent } from './lab-record.component';

describe('LabRecordComponent', () => {
  let component: LabRecordComponent;
  let fixture: ComponentFixture<LabRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
