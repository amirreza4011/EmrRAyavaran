import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetTestAnswerComponent } from './patinet-test-answer.component';

describe('PatinetTestAnswerComponent', () => {
  let component: PatinetTestAnswerComponent;
  let fixture: ComponentFixture<PatinetTestAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatinetTestAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatinetTestAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
