import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Intuition from './reducers/intuition.reducer';
import * as Sound from './reducers/sound.reducer';
import * as Users from './reducers/duels/users.reducer';
import * as Test from './reducers/duels/test.reducer';

let duelsReducers = combineReducers({
  users: Users.reducer,
  test: Test.testReducerTwo,
});

export interface State {
  arena: Arena.ArenaState;
  intuition: Intuition.IntuitionState;
  sound: Sound.SoundState;
  duels: {
    users: Users.UsersState;
    test: Test.TestState;
  };
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
  intuition: Intuition.reducer,
  sound: Sound.reducer,
  duels: duelsReducers,
};
