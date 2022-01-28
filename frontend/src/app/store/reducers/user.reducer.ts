import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  login: string;
  isAuth: boolean;
}

const initialState: UserState = {
  login: '',
  isAuth: false,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.addLogin, (state, { login }) => ({
    ...state,
    login: login,
  })),
  on(UserActions.userIsAuth, (state) => ({
    ...state,
    isAuth: true,
  })),
  on(UserActions.userIsNotAuth, (state) => ({
    ...state,
    isAuth: false,
  }))
);
