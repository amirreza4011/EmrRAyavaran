import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasvirComponent } from './tasvir.component';

describe('TasvirComponent', () => {
  let component: TasvirComponent;
  let fixture: ComponentFixture<TasvirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasvirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasvirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
