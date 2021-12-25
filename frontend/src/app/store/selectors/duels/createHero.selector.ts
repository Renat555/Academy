import { createSelector } from '@ngrx/store';
import { UserState } from '../../reducers/duels/createHero.reducer';
import { AppState } from '../../state/app.state';

const createHero = (state: AppState) => state.duels.user;

export const selectForms = createSelector(
  createHero,
  (state: UserState) => state.forms
);

export const selectElements = createSelector(
  createHero,
  (state: UserState) => state.elements
);

export const selectName = createSelector(
  createHero,
  (state: UserState) => state.name
);
