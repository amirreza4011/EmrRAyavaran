import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoItemComponent } from './logo-item.component';

describe('LogoItemComponent', () => {
  let component: LogoItemComponent;
  let fixture: ComponentFixture<LogoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
