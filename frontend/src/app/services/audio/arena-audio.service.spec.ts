import { TestBed } from '@angular/core/testing';

import { ArenaAudioService } from './arena-audio.service';

describe('ArenaAudioService', () => {
  let service: ArenaAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArenaAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
