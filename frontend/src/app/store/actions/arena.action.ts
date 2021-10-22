import { createAction, props } from '@ngrx/store';

export enum healthAction {
  userHealth = '[health] user',
  enemyHealth = '[health] enemy',
}

export const changeUserHealth = createAction(
  healthAction.userHealth,
  props<{ health: number }>()
);

export const changeEnemyHealth = createAction(
  healthAction.enemyHealth,
  props<{ health: number }>()
);
