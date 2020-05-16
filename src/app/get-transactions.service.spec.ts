import { TestBed } from '@angular/core/testing';

import { GetTransactionsService } from './get-transactions.service';

describe('GetTransactionsService', () => {
  let service: GetTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
