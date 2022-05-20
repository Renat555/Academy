import { createAction, props } from '@ngrx/store';

export enum playersActions {
  setUser = '[players] setUser',
  setEnemy = '[players] setEnemy',
}

export enum battlefieldActions {
  spellPreparing = '[battlefield] spellPreparing',
  spellApproval = '[battlefield] spellApproval',
  deletePreparedSpells = '[battlefield] deletePreparedSpells',
}

export const setUser = createAction(
  playersActions.setUser,
  props<{ row: number; col: number }>()
);

export const setEnemy = createAction(
  playersActions.setEnemy,
  props<{ row: number; col: number }>()
);

export const spellPreparing = createAction(
  battlefieldActions.spellPreparing,
  props<{ spell: string; coordinates: number[][] }>()
);

export const spellApproval = createAction(
  battlefieldActions.spellApproval,
  props<{ spell: string; duration: number }>()
);

export const deletePreparedSpells = createAction(
  battlefieldActions.deletePreparedSpells
);
