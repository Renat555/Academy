import { createAction } from '@ngrx/store';

export enum muveActions {
  userMuve = '[muve] userMuve',
  enemyMuve = '[muve] enemyMuve',
}

export const userMuve = createAction(muveActions.userMuve);
export const enemyMuve = createAction(muveActions.enemyMuve);
