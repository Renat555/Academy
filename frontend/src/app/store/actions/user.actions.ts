import { createAction, props } from '@ngrx/store';

export enum userActions {
  addLogin = '[name] addLogin',
  userIsAuth = '[auth] userIsAuth',
  userIsNotAuth = '[auth] userIsNotAuth',
}

export const addLogin = createAction(
  userActions.addLogin,
  props<{ login: string }>()
);

export const userIsAuth = createAction(userActions.userIsAuth);
export const userIsNotAuth = createAction(userActions.userIsNotAuth);
