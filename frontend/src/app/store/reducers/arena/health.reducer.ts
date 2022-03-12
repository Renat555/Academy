import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as ArenaActions from '../../actions/arena/health.actions';

interface UserState {
  health: number;
}

export interface ArenaUsersState {
  user: UserState;
  enemy: UserState;
}

const initialState: ArenaUsersState = {
  user: {
    health: 100,
  },
  enemy: {
    health: 100,
  },
};

export const reducer = createReducer(
  initialState,
  on(ArenaActions.increaseUserHealth, (state, { health }) => {
    let totalHealth = state.user.health + health;
    if (totalHealth > 100) totalHealth = 100;
    return {
      ...state,
      user: { health: totalHealth },
    };
  }),
  on(ArenaActions.decreaseUserHealth, (state, { health }) => {
    return {
      ...state,
      user: { health: state.user.health - health },
    };
  }),
  on(ArenaActions.increaseEnemyHealth, (state, { health }) => {
    let totalHealth = state.enemy.health + health;
    if (totalHealth > 100) totalHealth = 100;
    return {
      ...state,
      enemy: { health: totalHealth },
    };
  }),
  on(ArenaActions.decreaseEnemyHealth, (state, { health }) => {
    return {
      ...state,
      enemy: { health: state.enemy.health - health },
    };
  }),
  on(ArenaActions.resetHealth, (state) => ({
    ...state,
    user: {
      health: 100,
    },
    enemy: {
      health: 100,
    },
  }))
);
