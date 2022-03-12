import { createSelector } from '@ngrx/store';
import { ArenaUsersState } from '../../reducers/arena/health.reducer';
import { AppState } from '../../state/app.state';

const userHealth = (state: AppState) => state.arena.health;
const enemyHealth = (state: AppState) => state.arena.health;

export const selectUserHealth = createSelector(
  userHealth,
  (state: ArenaUsersState) => state.user.health
);
export const selectEnemyHealth = createSelector(
  enemyHealth,
  (state: ArenaUsersState) => state.enemy.health
);
