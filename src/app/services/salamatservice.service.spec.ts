import { TestBed } from '@angular/core/testing';

import { SalamatserviceService } from './salamatservice.service';

describe('SalamatserviceService', () => {
  let service: SalamatserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalamatserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
