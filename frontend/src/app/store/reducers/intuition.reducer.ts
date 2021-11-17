import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as IntuitionActions from '../actions/intuition.action';

export interface IntuitionState {
  right: number;
  wrong: number;
}

const initialState: IntuitionState = {
  right: 0,
  wrong: 0,
};

const intuitionReducer = createReducer(
  initialState,
  on(IntuitionActions.addRightAnswer, (state) => ({
    ...state,
    right: state.right++,
  })),
  on(IntuitionActions.addWrongAnswer, (state) => ({
    ...state,
    wrong: state.wrong++,
  })),
  on(IntuitionActions.resetAnswers, (state) => ({
    right: 0,
    wrong: 0,
  }))
);

export function reducer(state: IntuitionState | undefined, action: Action) {
  return intuitionReducer(state, action);
}
