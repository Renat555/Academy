import { createReducer, createSelector, on } from '@ngrx/store';
import * as ArenaActions from '../actions/arena.action';

export interface State {
  user: {
    health: number;
  };
  enemy: {
    health: number;
  };
}

const initialState: State = {
  user: {
    health: 100,
  },
  enemy: {
    health: 100,
  },
};

const arenaReducer = createReducer(
  initialState,
  on(ArenaActions.changeUserHealth, state => ({...state, user: }))
);

// export function arenaReducer(
//   state: State = initialState,
//   action: HealthUnion
// ): State {
//   switch (action.type) {
//     case healthAction.userHealth:
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case healthAction.enemyHealth:
//       return {
//         ...state,
//         enemy: action.payload,
//       };
//     default:
//       return state;
//   }
// }

const userHealth = (state: State) => state.user;
const enemyHealth = (state: State) => state.enemy;

export const selectUserHealth = createSelector(userHealth, (state) => state);
export const selectEnemyHealth = createSelector(enemyHealth, (state) => state);
