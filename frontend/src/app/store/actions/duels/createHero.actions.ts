import { createAction, props } from '@ngrx/store';

export enum chooseActions {
  addElement = '[choose] addElement',
  addForm = '[choose] addForm',
  deleteElement = '[choose] deleteElement',
  deleteForm = '[choose] deleteForm',
}

export const createNameAction = '[create] createName';

export const addElement = createAction(
  chooseActions.addElement,
  props<{ element: string }>()
);

export const addForm = createAction(
  chooseActions.addForm,
  props<{ form: string }>()
);

export const deleteElement = createAction(
  chooseActions.deleteElement,
  props<{ element: string }>()
);

export const deleteForm = createAction(
  chooseActions.deleteForm,
  props<{ form: string }>()
);

export const createName = createAction(
  createNameAction,
  props<{ name: string }>()
);
