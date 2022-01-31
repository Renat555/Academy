import { createAction, props } from '@ngrx/store';
import { Result } from '../../reducers/intuition/results.reducer';

export enum resultsAction {
  addResults = '[results] addResults',
}

export const addResults = createAction(
  resultsAction.addResults,
  props<{
    results: Result[];
  }>()
);
