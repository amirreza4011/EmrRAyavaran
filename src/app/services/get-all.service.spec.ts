import { TestBed } from '@angular/core/testing';

import { GetAllService } from './get-all.service';

describe('GetAllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllService = TestBed.get(GetAllService);
    expect(service).toBeTruthy();
  });
});
