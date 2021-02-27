import { TestBed } from '@angular/core/testing';

import { ServiceAWS } from './service.aws';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAWS = TestBed.get(ServiceAWS);
    expect(service).toBeTruthy();
  });
});
