import { createSelector, State } from '@ngrx/store';
import { IntuitionState } from '../reducers/intuition.reducer';
import { AppState } from '../state/app.state';

const answers = (state: AppState) => state.intuition;

export const selectAnswers = createSelector(
  answers,
  (state: IntuitionState) => state
);
