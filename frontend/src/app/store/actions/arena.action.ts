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

// export class changeUserHealth implements Action {
//   constructor(
//     public payload: {
//       health: number;
//     }
//   ) {}

//   readonly type = healthAction.userHealth;
// }

// export class changeEnemyHealth implements Action {
//   constructor(
//     public payload: {
//       health: number;
//     }
//   ) {}

//   readonly type = healthAction.enemyHealth;
// }
