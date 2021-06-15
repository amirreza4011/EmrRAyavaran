import { TestBed } from '@angular/core/testing';

import { OrderDocIDServiceService } from './order-doc-idservice.service';

describe('OrderDocIDServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDocIDServiceService = TestBed.get(OrderDocIDServiceService);
    expect(service).toBeTruthy();
  });
});
