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

export const selectUserName = createSelector(
  users,
  (state: UsersState) => state.user.name
);

export const selectEnemyName = createSelector(
  users,
  (state: UsersState) => state.enemy.name
);

export const selectUserEffects = createSelector(
  users,
  (state: UsersState) => state.user.effects
);

export const selectEnemyEffects = createSelector(
  users,
  (state: UsersState) => state.enemy.effects
);

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

export const selectUsers = createSelector(users, (state: UsersState) => state);
