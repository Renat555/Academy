import { createAction, props } from '@ngrx/store';

export enum playersActions {
  setUser = '[players] setUser',
  setEnemy = '[players] setEnemy',
}

export const setUser = createAction(
  playersActions.setUser,
  props<{ row: number; col: number }>()
);
