import { TestBed } from '@angular/core/testing';

import { GetStocksBoughtService } from './get-stocks-bought.service';

describe('GetStocksBoughtService', () => {
  let service: GetStocksBoughtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStocksBoughtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
