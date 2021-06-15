import { TestBed } from '@angular/core/testing';

import { EmrdrugserviceService } from './emrdrugservice.service';

describe('EmrdrugserviceService', () => {
  // tslint:disable-next-line:prefer-const
  let service: EmrdrugserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
   // service = TestBed.inject(EmrdrugserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
