import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Intuition from './reducers/intuition.reducer';
import * as Sound from './reducers/sound.reducer';
import * as Users from './reducers/duels/users.reducer';
import * as EffectsWindow from './reducers/duels/effectsWindow.reducer';
import * as Muve from './reducers/duels/muve.reducer';

const duelsReducers = combineReducers({
  users: Users.reducer,
  effectsWidow: EffectsWindow.reducer,
  muve: Muve.reducer,
});

export interface State {
  arena: Arena.ArenaState;
  intuition: Intuition.IntuitionState;
  sound: Sound.SoundState;
  duels: {
    users: Users.UsersState;
    effectsWidow: EffectsWindow.EffectsWindowState;
    muve: Muve.MuveState;
  };
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
  intuition: Intuition.reducer,
  sound: Sound.reducer,
  duels: duelsReducers,
};
