import { TestBed } from '@angular/core/testing';

import { PatientListServiceService } from './patient-list-service.service';

describe('PatientListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientListServiceService = TestBed.get(PatientListServiceService);
    expect(service).toBeTruthy();
  });
});
