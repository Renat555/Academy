import { createAction, props } from '@ngrx/store';

export enum chooseActions {
  addElement = '[choose] addElement',
  addForm = '[choose] addForm',
  deleteElement = '[choose] deleteElement',
  deleteForm = '[choose] deleteForm',
}

export enum effectsActions {
  addUserEffect = '[effect] addUserEffect',
  addEnemyEffect = '[effect] addEnemyEffect',
}

export enum nameActions {
  addUserName = '[name] addUserName',
  addEnemyName = '[name] addEnemyName',
}

export enum pointsActions {
  changeUserActionPoints = '[points] changeUserActionPoints',
  changeEnemyActionPoints = '[points] changeEnemyActionPoints',
  changeUserEnergyPoints = '[points] changeUserEnergyPoints',
  changeEnemyEnergyPoints = '[points] changeEnemyEnergyPoints',
}

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

export const addUserName = createAction(
  nameActions.addUserName,
  props<{ name: string }>()
);

export const addEnemyName = createAction(
  nameActions.addEnemyName,
  props<{ name: string }>()
);

export const addUserEffect = createAction(
  effectsActions.addUserEffect,
  props<{ effect: string }>()
);

export const addEnemyEffect = createAction(
  effectsActions.addEnemyEffect,
  props<{ effect: string }>()
);

export const changeUserActionPoints = createAction(
  pointsActions.changeUserActionPoints,
  props<{ points: number }>()
);

export const changeEnemyActionPoints = createAction(
  pointsActions.changeEnemyActionPoints,
  props<{ points: number }>()
);

export const changeUserEnergyPoints = createAction(
  pointsActions.changeUserEnergyPoints,
  props<{ points: number }>()
);

export const changeEnemyEnergyPoints = createAction(
  pointsActions.changeEnemyEnergyPoints,
  props<{ points: number }>()
);
