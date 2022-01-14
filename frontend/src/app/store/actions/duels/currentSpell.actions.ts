import { createAction, props } from '@ngrx/store';

export enum currentSpellActions {
  addForm = '[currentSpell] addForm',
  addElement = '[currentSpell] addElement',
  deleteForm = '[currentSpell] deleteForm',
  deleteElement = '[currentSpell] deleteElement',
}

export const addForm = createAction(
  currentSpellActions.addForm,
  props<{ form: string }>()
);

export const addElement = createAction(
  currentSpellActions.addElement,
  props<{ element: string }>()
);

export const deleteForm = createAction(currentSpellActions.deleteForm);

export const deleteElement = createAction(currentSpellActions.deleteElement);