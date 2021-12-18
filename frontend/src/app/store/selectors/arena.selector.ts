import { createSelector } from "@ngrx/store";
import { ArenaState } from "../reducers/arena.reducer";
import { AppState } from "../state/app.state";

const userHealth = (state: AppState) => state.arena;
const enemyHealth = (state: AppState) => state.arena;
  
export const selectUserHealth = createSelector(userHealth, (state: ArenaState) => state.user.health);
export const selectEnemyHealth = createSelector(enemyHealth, (state: ArenaState) => state.enemy.health);