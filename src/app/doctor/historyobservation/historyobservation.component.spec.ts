import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryobservationComponent } from './historyobservation.component';

describe('HistoryobservationComponent', () => {
  let component: HistoryobservationComponent;
  let fixture: ComponentFixture<HistoryobservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryobservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryobservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
