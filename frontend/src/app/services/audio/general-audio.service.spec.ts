import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GeneralAudioService } from './general-audio.service';

describe('GeneralAudioService', () => {
  let service: GeneralAudioService;
  const initialState = { enabled: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(GeneralAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
