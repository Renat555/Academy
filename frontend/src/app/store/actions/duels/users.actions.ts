import { createAction, props } from '@ngrx/store';

export enum chooseActions {
  addElement = '[choose] addElement',
  addForm = '[choose] addForm',
  deleteElement = '[choose] deleteElement',
  deleteForm = '[choose] deleteForm',
}

export enum effectsActions {
  addUserBuff = '[effect] addUserBuff',
  addUserDebuff = '[effect] addUserDebuff',
  addEnemyBuff = '[effect] addEnemyBuff',
  addEnemyDebuff = '[effect] addEnemyDebuff',
}

export enum nameActions {
  addUserName = '[name] addUserName',
  deleteUserName = '[name] deleteUserName',
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

export const deleteUserName = createAction(nameActions.deleteUserName);

export const addEnemyName = createAction(
  nameActions.addEnemyName,
  props<{ name: string }>()
);

export const addUserBuff = createAction(
  effectsActions.addUserBuff,
  props<{ effect: string }>()
);

export const addUserDebuff = createAction(
  effectsActions.addUserDebuff,
  props<{ effect: string }>()
);

export const addEnemyBuff = createAction(
  effectsActions.addEnemyBuff,
  props<{ effect: string }>()
);

export const addEnemyDebuff = createAction(
  effectsActions.addEnemyDebuff,
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
