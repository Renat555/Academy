import { createSelector } from '@ngrx/store';
import { TestState } from '../../reducers/duels/test.reducer';
import { AppState } from '../../state/app.state';

const test = (state: AppState) => state.duels.test;

export const selectTest = createSelector(
  test,
  (state: TestState) => state.test
);
