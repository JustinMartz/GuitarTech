import { TestBed } from '@angular/core/testing';

import { GuitarPictureService } from './guitar-picture.service';

describe('GuitarPictureService', () => {
  let service: GuitarPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuitarPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
