import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ArenaAudioService } from './arena-audio.service';

describe('ArenaAudioService', () => {
  let service: ArenaAudioService;
  const initialState = { enabled: true };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(ArenaAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
