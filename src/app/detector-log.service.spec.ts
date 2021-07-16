import { TestBed } from '@angular/core/testing';

import { DetectorLogService } from './detector-log.service';

describe('DetectorLogService', () => {
  let service: DetectorLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectorLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
