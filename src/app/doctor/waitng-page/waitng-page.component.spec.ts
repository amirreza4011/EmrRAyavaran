import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitngPageComponent } from './waitng-page.component';

describe('WaitngPageComponent', () => {
  let component: WaitngPageComponent;
  let fixture: ComponentFixture<WaitngPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitngPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitngPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
