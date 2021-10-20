import { ActionReducerMap } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';

export interface State {
  arena: Arena.State;
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.arenaReducer,
};
