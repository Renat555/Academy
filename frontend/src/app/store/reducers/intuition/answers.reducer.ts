import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as IntuitionActions from '../../actions/intuition/answers.action';

export interface AnswersState {
  right: number;
  wrong: number;
}

const initialState: AnswersState = {
  right: 0,
  wrong: 0,
};

export const reducer = createReducer(
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
