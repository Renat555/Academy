import { createSelector } from '@ngrx/store';
import { EffectsWindowState } from '../../reducers/duels/effectsWindow.reducer';
import { AppState } from '../../state/app.state';

const effectsWindow = (state: AppState) => state.duels.effectsWindow;

export const selectEffectsWindowSwitch = createSelector(
  effectsWindow,
  (state: EffectsWindowState) => state.enabled
);
