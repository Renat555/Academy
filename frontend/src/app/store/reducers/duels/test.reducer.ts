import { createReducer, on } from '@ngrx/store';
import * as testActions from '../../actions/duels/effects.actions';

export interface TestState {
  test: number;
}

const initialState: TestState = {
  test: 0,
};

export const testReducerTwo = createReducer(
  initialState,
  on(testActions.testElement, (state, { number }) => ({
    ...state,
    test: number,
  }))
);
