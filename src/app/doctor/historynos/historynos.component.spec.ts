import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorynosComponent } from './historynos.component';

describe('HistorynosComponent', () => {
  let component: HistorynosComponent;
  let fixture: ComponentFixture<HistorynosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorynosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorynosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
