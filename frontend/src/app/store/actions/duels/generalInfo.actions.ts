import { createAction } from '@ngrx/store';

export enum muveActions {
  userMuve = '[muve] userMuve',
  enemyMuve = '[muve] enemyMuve',
}

export enum EnemyTypeActions {
  human = '[enemyType] human',
  AI = '[enemyType] AI',
}

export const userMuve = createAction(muveActions.userMuve);
export const enemyMuve = createAction(muveActions.enemyMuve);

export const humanEnemy = createAction(EnemyTypeActions.human);
export const AIEnemy = createAction(EnemyTypeActions.AI);
