import { createAction, props } from '@ngrx/store';

export enum healthAction {
  userHealth = '[health] user',
  enemyHealth = '[health] enemy',
  health = '[health] health',
}

export const decreaseUserHealth = createAction(
  healthAction.userHealth,
  props<{ health: number }>()
);

export const decreaseEnemyHealth = createAction(
  healthAction.enemyHealth,
  props<{ health: number }>()
);

export const resetHealth = createAction(healthAction.health);
