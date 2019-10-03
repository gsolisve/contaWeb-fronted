import { TestBed, inject } from '@angular/core/testing';

import { DeclaracionService } from './declaracion.service';

describe('DeclaracionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeclaracionService]
    });
  });

  it('should be created', inject([DeclaracionService], (service: DeclaracionService) => {
    expect(service).toBeTruthy();
  }));
});
