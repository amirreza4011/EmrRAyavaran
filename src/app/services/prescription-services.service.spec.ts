import { TestBed } from '@angular/core/testing';

import { PrescriptionServicesService } from './prescription-services.service';

describe('PrescriptionServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrescriptionServicesService = TestBed.get(PrescriptionServicesService);
    expect(service).toBeTruthy();
  });
});
