import { TestBed } from '@angular/core/testing';

import { ApiconfigserviceService } from './apiconfigservice.service';

describe('ApiconfigserviceService', () => {
  let service: ApiconfigserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiconfigserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
