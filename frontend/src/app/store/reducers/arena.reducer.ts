import { Action, createReducer, createSelector, on } from '@ngrx/store';
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
  on(ArenaActions.changeUserHealth, (state, health) => ({
    ...state,
    user: health,
  })),
  on(ArenaActions.changeEnemyHealth, (state, health) => ({
    ...state,
    enemy: health,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return arenaReducer(state, action);
}

const userHealth = (state: State) => state.user;
const enemyHealth = (state: State) => state.enemy;

export const selectUserHealth = createSelector(userHealth, (state) => state);
export const selectEnemyHealth = createSelector(enemyHealth, (state) => state);
