import { createAction, props } from '@ngrx/store';

export enum healthAction {
  increaseUserHealth = '[health] increaseUserHealth',
  decreaseUserHealth = '[health] decreaseUserHealth',
  increaseEnemyHealth = '[health] increaseEnemyHealth',
  decreaseEnemyHealth = '[health] decreaseEnemyHealth',
  resetHealth = '[health] resetHealth',
}

export const increaseUserHealth = createAction(
  healthAction.increaseUserHealth,
  props<{ health: number }>()
);

export const decreaseUserHealth = createAction(
  healthAction.decreaseUserHealth,
  props<{ health: number }>()
);

export const increaseEnemyHealth = createAction(
  healthAction.increaseEnemyHealth,
  props<{ health: number }>()
);

export const decreaseEnemyHealth = createAction(
  healthAction.decreaseEnemyHealth,
  props<{ health: number }>()
);

export const resetHealth = createAction(healthAction.resetHealth);
