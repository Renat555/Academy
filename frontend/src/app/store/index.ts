import { ActionReducerMap } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';

export interface State {
  arena: Arena.ArenaState;
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
};
