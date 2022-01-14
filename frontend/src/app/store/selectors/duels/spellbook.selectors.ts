import { createSelector } from '@ngrx/store';
import { SpellbookState } from '../../reducers/duels/spellBook.reducer';
import { AppState } from '../../state/app.state';

const spellbook = (state: AppState) => state.duels.spellbook;

export const selectSpellbook = createSelector(
  spellbook,
  (state: SpellbookState) => state
);
