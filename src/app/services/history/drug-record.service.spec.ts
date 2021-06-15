import { TestBed } from '@angular/core/testing';

import { DrugRecordService } from './drug-record.service';

describe('DrugRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrugRecordService = TestBed.get(DrugRecordService);
    expect(service).toBeTruthy();
  });
});
