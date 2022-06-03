import { TestBed } from '@angular/core/testing';

import { GeneralAudioService } from './general-audio.service';

describe('AudioService', () => {
  let service: GeneralAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
