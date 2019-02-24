import { TestBed } from '@angular/core/testing';

import { OrderProductsService } from './order-products.service';

describe('OrderProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderProductsService = TestBed.get(OrderProductsService);
    expect(service).toBeTruthy();
  });
});
