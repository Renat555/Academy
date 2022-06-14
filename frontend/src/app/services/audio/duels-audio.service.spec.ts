import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { DuelsAudioService } from './duels-audio.service';

describe('DuelsAudioService', () => {
  let service: DuelsAudioService;
  const initialState = { enabled: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(DuelsAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
