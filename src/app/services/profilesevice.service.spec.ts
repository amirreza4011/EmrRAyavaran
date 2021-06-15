import { TestBed } from '@angular/core/testing';

import { ProfileseviceService } from './profilesevice.service';

describe('ProfileseviceService', () => {
  let service: ProfileseviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ProfileseviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
