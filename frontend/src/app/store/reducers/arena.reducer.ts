import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as ArenaActions from '../actions/arena.action';

export interface UserState {
  health: number
}

export interface ArenaState {
  user: UserState;
  enemy: UserState
}

const initialState: ArenaState = {
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
    user: {health: state.user.health - health.health},
  })),
  on(ArenaActions.changeEnemyHealth, (state, health) => ({
    ...state,
    enemy: {health: state.enemy.health - health.health},
  }))
);

export function reducer(state: ArenaState | undefined, action: Action) {
  return arenaReducer(state, action);
}
