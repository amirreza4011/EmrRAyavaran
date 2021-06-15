import { TestBed } from '@angular/core/testing';

import { LocalStorage.ServiceService } from './local-storage.service.service';

describe('LocalStorage.ServiceService', () => {
  let service: LocalStorage.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorage.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
