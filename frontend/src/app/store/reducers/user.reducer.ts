import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  login: string;
  isAuth: boolean;
}

let isAuth: boolean = false;

if (localStorage.getItem('token') !== null) {
  isAuth = true;
}

const initialState: UserState = {
  login: '',
  isAuth: isAuth,
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
