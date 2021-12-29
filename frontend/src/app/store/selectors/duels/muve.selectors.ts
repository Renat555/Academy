import { createSelector } from '@ngrx/store';
import { MuveState } from '../../reducers/duels/muve.reducer';
import { AppState } from '../../state/app.state';

const muve = (state: AppState) => state.duels.muve;

export const selectMuve = createSelector(
  muve,
  (state: MuveState) => state.muve
);
