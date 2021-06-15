import { TestBed } from '@angular/core/testing';

import { LabReqService } from './lab-req.service';

describe('LabReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabReqService = TestBed.get(LabReqService);
    expect(service).toBeTruthy();
  });
});
