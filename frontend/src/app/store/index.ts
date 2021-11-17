import { ActionReducerMap } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Intuition from './reducers/intuition.reducer';

export interface State {
  arena: Arena.ArenaState;
  intuition: Intuition.IntuitionState;
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
  intuition: Intuition.reducer,
};
