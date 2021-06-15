import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { d_loginPageComponent } from './doctor-login-page.component';

describe('d_loginPageComponent', () => {
  let component: d_loginPageComponent;
  let fixture: ComponentFixture<d_loginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ d_loginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(d_loginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
