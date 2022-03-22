import { createAction } from '@ngrx/store';

export enum muveActions {
  userMuve = '[muve] userMuve',
  enemyMuve = '[muve] enemyMuve',
}

export enum EnemyTypeActions {
  human = '[enemyType] human',
  AI = '[enemyType] AI',
}

export enum EnemyCreatingActions {
  enemyCreated = '[enemyCreating] enemyCreated',
  enemyNotCreated = '[enemyNotCreated] enemyNotCreated',
}

export const userMuve = createAction(muveActions.userMuve);
export const enemyMuve = createAction(muveActions.enemyMuve);

export const humanEnemy = createAction(EnemyTypeActions.human);
export const AIEnemy = createAction(EnemyTypeActions.AI);

export const enemyCreated = createAction(EnemyCreatingActions.enemyCreated);
export const enemyNotCreated = createAction(
  EnemyCreatingActions.enemyNotCreated
);
