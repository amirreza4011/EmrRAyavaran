import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultTableComponent } from './show-result-table.component';

describe('ShowResultTableComponent', () => {
  let component: ShowResultTableComponent;
  let fixture: ComponentFixture<ShowResultTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResultTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
