import { createSelector } from '@ngrx/store';
import { CurrentSpellState } from '../../reducers/duels/currentSpell.reducer';
import { AppState } from '../../state/app.state';

const currentSpell = (state: AppState) => state.duels.currentSpell;

export const selectForm = createSelector(
  currentSpell,
  (state: CurrentSpellState) => state.form
);

export const selectElement = createSelector(
  currentSpell,
  (state: CurrentSpellState) => state.element
);
