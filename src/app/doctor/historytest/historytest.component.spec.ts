import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorytestComponent } from './historytest.component';

describe('HistorytestComponent', () => {
  let component: HistorytestComponent;
  let fixture: ComponentFixture<HistorytestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorytestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorytestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
