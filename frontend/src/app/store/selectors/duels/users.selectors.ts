import { createSelector } from '@ngrx/store';
import { UsersState } from '../../reducers/duels/users.reducer';
import { AppState } from '../../state/app.state';

const users = (state: AppState) => state.duels.users;

export const selectForms = createSelector(
  users,
  (state: UsersState) => state.user.forms
);

export const selectElements = createSelector(
  users,
  (state: UsersState) => state.user.elements
);

export const selectUserId = createSelector(
  users,
  (state: UsersState) => state.user.id
);

export const selectUserName = createSelector(
  users,
  (state: UsersState) => state.user.name
);

export const selectEnemyName = createSelector(
  users,
  (state: UsersState) => state.enemy.name
);

export const selectUserEffects = createSelector(users, (state: UsersState) => {
  let effects = [];
  let userBuffs = state.user.buffs;
  let userDebuffs = state.user.debuffs;

  for (let i = 0; i < userBuffs.length; i++) {
    effects.push(userBuffs[i]);
  }
  for (let i = 0; i < userDebuffs.length; i++) {
    effects.push(userDebuffs[i]);
  }

  return effects;
});

export const selectEnemyEffects = createSelector(users, (state: UsersState) => {
  let effects = [];
  let enemyBuffs = state.enemy.buffs;
  let enemyDebuffs = state.enemy.debuffs;

  for (let i = 0; i < enemyBuffs.length; i++) {
    effects.push(enemyBuffs[i]);
  }
  for (let i = 0; i < enemyDebuffs.length; i++) {
    effects.push(enemyDebuffs[i]);
  }

  return effects;
});

export const selectUserActionPoints = createSelector(
  users,
  (state: UsersState) => state.user.actionPoints
);

export const selectEnemyActionPoints = createSelector(
  users,
  (state: UsersState) => state.enemy.actionPoints
);

export const selectUserEnergyPoints = createSelector(
  users,
  (state: UsersState) => state.user.energyPoints
);

export const selectEnemyEnergyPoints = createSelector(
  users,
  (state: UsersState) => state.enemy.energyPoints
);

export const selectUserHealth = createSelector(
  users,
  (state: UsersState) => state.user.health
);

export const selectEnemyHealth = createSelector(
  users,
  (state: UsersState) => state.enemy.health
);

export const selectUserMaxHealth = createSelector(
  users,
  (state: UsersState) => state.user.maxHealth
);

export const selectEnemyMaxHealth = createSelector(
  users,
  (state: UsersState) => state.enemy.maxHealth
);

export const selectUsers = createSelector(users, (state: UsersState) => state);
