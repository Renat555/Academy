import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as SoundActions from '../actions/sound.action';

export interface SoundState {
  enabled: boolean;
}

const initialState: SoundState = {
  enabled: true,
};

const soundReducer = createReducer(
  initialState,
  on(SoundActions.soundOff, (state) => ({
    enabled: false,
  })),
  on(SoundActions.soundOn, (state) => ({
    enabled: true,
  }))
);

export function reducer(state: SoundState | undefined, action: Action) {
  return soundReducer(state, action);
}
