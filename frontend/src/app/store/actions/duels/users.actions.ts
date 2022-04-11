import { createAction, props } from '@ngrx/store';

export enum chooseActions {
  addElement = '[choose] addElement',
  addForm = '[choose] addForm',
  deleteElement = '[choose] deleteElement',
  deleteForm = '[choose] deleteForm',
}

export enum effectsActions {
  setUserBuffs = '[effect] setUserBuffs',
  setUserDebuffs = '[effect] setUserDebuffs',
  setEnemyBuffs = '[effect] setEnemyBuffs',
  setEnemyDebuffs = '[effect] setEnemyDebuffs',
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

export enum healthActions {
  setUserHealth = '[health] setUserHealth',
  setEnemyHealth = '[health] setEnemyHealth',
  setUserMaxHealth = '[health] setUserMaxHealth',
  setEnemyMaxHealth = '[health] setEnemyMaxHealth',
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

export const setUserBuffs = createAction(
  effectsActions.setUserBuffs,
  props<{ userBuffs: [string, number][] }>()
);

export const setUserDebuffs = createAction(
  effectsActions.setUserDebuffs,
  props<{ userDebuffs: [string, number][] }>()
);

export const setEnemyBuffs = createAction(
  effectsActions.setEnemyBuffs,
  props<{ enemyBuffs: [string, number][] }>()
);

export const setEnemyDebuffs = createAction(
  effectsActions.setEnemyDebuffs,
  props<{ enemyDebuffs: [string, number][] }>()
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

export const setUserHealth = createAction(
  healthActions.setUserHealth,
  props<{ health: number }>()
);

export const setEnemyHealth = createAction(
  healthActions.setEnemyHealth,
  props<{ health: number }>()
);

export const setUserMaxHealth = createAction(
  healthActions.setUserMaxHealth,
  props<{ health: number }>()
);

export const setEnemyMaxHealth = createAction(
  healthActions.setEnemyMaxHealth,
  props<{ health: number }>()
);
