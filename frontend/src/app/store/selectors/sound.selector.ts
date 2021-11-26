import { createSelector, State } from '@ngrx/store';
import { SoundState } from '../reducers/sound.reducer';
import { AppState } from '../state/app.state';

const soundSwitch = (state: AppState) => state.sound;

export const selectSoundSwitch = createSelector(
  soundSwitch,
  (state: SoundState) => state.enabled
);
