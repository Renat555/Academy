import { createSelector, State } from '@ngrx/store';
import { AnswersState } from '../../reducers/intuition/answers.reducer';
import { AppState } from '../../state/app.state';

const answers = (state: AppState) => state.intuition.answers;

export const selectAnswers = createSelector(
  answers,
  (state: AnswersState) => state
);
