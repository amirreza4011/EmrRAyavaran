import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrugNosComponent } from './add-drug-nos.component';

describe('AddDrugNosComponent', () => {
  let component: AddDrugNosComponent;
  let fixture: ComponentFixture<AddDrugNosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrugNosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrugNosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
