import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { AppState } from '../state/app.state';

const user = (state: AppState) => state.user;

export const selectUserName = createSelector(
  user,
  (state: UserState) => state.login
);

export const selectUserIsAuth = createSelector(
  user,
  (state: UserState) => state.isAuth
);
