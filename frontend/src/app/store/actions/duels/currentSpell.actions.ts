import { createAction, props } from '@ngrx/store';

export enum currentSpellActions {
  addForm = '[currentSpell] addForm',
  addElement = '[currentSpell] addElement',
  deleteForm = '[currentSpell] deleteForm',
  deleteElement = '[currentSpell] deleteElement',
  addDespell = '[currentSpell] addDespell',
  deleteDespell = '[currentSpell] deleteDespell',
  addBattlefieldSpell = '[currentSpell] addBattlefieldSpell',
  deleteBattlefieldSpell = '[currentSpell] deleteBattlefieldSpell',
}

export const addForm = createAction(
  currentSpellActions.addForm,
  props<{ form: string }>()
);

export const addElement = createAction(
  currentSpellActions.addElement,
  props<{ element: string }>()
);

export const addDespell = createAction(
  currentSpellActions.addDespell,
  props<{ despell: string }>()
);

export const addBattlefieldSpell = createAction(
  currentSpellActions.addBattlefieldSpell,
  props<{ battlefieldSpell: string; coordinates: number[][] }>()
);

export const deleteForm = createAction(currentSpellActions.deleteForm);

export const deleteElement = createAction(currentSpellActions.deleteElement);

export const deleteDespell = createAction(currentSpellActions.deleteDespell);

export const deleteBattlefieldSpell = createAction(
  currentSpellActions.deleteBattlefieldSpell
);
