import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Intuition from './reducers/intuition.reducer';
import * as Sound from './reducers/sound.reducer';
import * as CreateHero from './reducers/duels/createHero.reducer';
import * as Test from './reducers/duels/test.reducer';

let duelsReducers = combineReducers({
  user: CreateHero.reducer,
  test: Test.testReducerTwo,
});

export interface State {
  arena: Arena.ArenaState;
  intuition: Intuition.IntuitionState;
  sound: Sound.SoundState;
  duels: {
    user: CreateHero.UserState;
    test: Test.TestState;
  };
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
  intuition: Intuition.reducer,
  sound: Sound.reducer,
  duels: duelsReducers,
};
