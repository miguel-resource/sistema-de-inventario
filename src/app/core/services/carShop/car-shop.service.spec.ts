import { TestBed } from '@angular/core/testing';

import { CarShopService } from './car-shop.service';

describe('CarShopService', () => {
  let service: CarShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
