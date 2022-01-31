import { createAction, props } from '@ngrx/store';

export enum intuitionAction {
  rightAnswer = '[intuition] sendRightAnswer',
  wrongAnswer = '[intuition] sendWrongAnswer',
  resetAnswers = '[intuition] resetAnswers',
}

export const addRightAnswer = createAction(intuitionAction.rightAnswer);
export const addWrongAnswer = createAction(intuitionAction.wrongAnswer);
export const resetAnswers = createAction(intuitionAction.resetAnswers);
