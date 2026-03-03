import { TestBed } from '@angular/core/testing';

import { branchService } from './branch';

describe('Branch', () => {
  let service: branchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(branchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
