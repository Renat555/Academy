import { createAction } from '@ngrx/store';

export enum moveActions {
  userMove = '[muve] userMove',
  enemyMove = '[muve] enemyMove',
}

export enum EnemyTypeActions {
  human = '[enemyType] human',
  AI = '[enemyType] AI',
}

export enum EnemyCreatingActions {
  enemyCreated = '[enemyCreating] enemyCreated',
  enemyNotCreated = '[enemyNotCreated] enemyNotCreated',
}

export const userMove = createAction(moveActions.userMove);
export const enemyMove = createAction(moveActions.enemyMove);

export const humanEnemy = createAction(EnemyTypeActions.human);
export const AIEnemy = createAction(EnemyTypeActions.AI);

export const enemyCreated = createAction(EnemyCreatingActions.enemyCreated);
export const enemyNotCreated = createAction(
  EnemyCreatingActions.enemyNotCreated
);
