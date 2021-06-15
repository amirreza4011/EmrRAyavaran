import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAllComponent } from './print-all.component';

describe('PrintAllComponent', () => {
  let component: PrintAllComponent;
  let fixture: ComponentFixture<PrintAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
