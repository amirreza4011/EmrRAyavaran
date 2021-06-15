import { TestBed } from '@angular/core/testing';

import { LabratoryTestServiceService } from './labratory-test-service.service';

describe('LabratoryTestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabratoryTestServiceService = TestBed.get(LabratoryTestServiceService);
    expect(service).toBeTruthy();
  });
});
