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

export const selectName = createSelector(
  users,
  (state: UsersState) => state.user.name
);

export const selectUserEffects = createSelector(
  users,
  (state: UsersState) => state.user.effects
);

export const selectEnemyEffects = createSelector(
  users,
  (state: UsersState) => state.enemy.effects
);

export const selectUsers = createSelector(users, (state: UsersState) => state);
