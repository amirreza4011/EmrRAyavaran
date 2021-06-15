import { TestBed } from '@angular/core/testing';

import { IPersonServiceService } from './i-person-service.service';

describe('IPersonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IPersonServiceService = TestBed.get(IPersonServiceService);
    expect(service).toBeTruthy();
  });
});
