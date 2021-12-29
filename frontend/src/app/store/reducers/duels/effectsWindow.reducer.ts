import { createReducer, on } from '@ngrx/store';
import * as effectsWindowActions from '../../actions/duels/effectsWindow.actions';

export interface EffectsWindowState {
  enabled: boolean;
}

const initialState: EffectsWindowState = {
  enabled: false,
};

export const reducer = createReducer(
  initialState,
  on(effectsWindowActions.showEffects, (state) => ({
    enabled: true,
  })),
  on(effectsWindowActions.hideEffects, (state) => ({
    enabled: false,
  }))
);
