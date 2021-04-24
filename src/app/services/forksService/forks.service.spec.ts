import { TestBed } from '@angular/core/testing';

import { ForksService } from './forks.service';

describe('ForForksService', () => {
  let service: ForksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
