import { createReducer, on } from '@ngrx/store';
import * as SoundActions from '../actions/sound.action';

export interface SoundState {
  enabled: boolean;
}

const initialState: SoundState = {
  enabled: true,
};

export const reducer = createReducer(
  initialState,
  on(SoundActions.soundOff, (state) => ({
    enabled: false,
  })),
  on(SoundActions.soundOn, (state) => ({
    enabled: true,
  }))
);
