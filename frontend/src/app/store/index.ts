import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Intuition from './reducers/intuition.reducer';
import * as Sound from './reducers/sound.reducer';
import * as Users from './reducers/duels/users.reducer';
import * as EffectsWindow from './reducers/duels/effectsWindow.reducer';
import * as Muve from './reducers/duels/muve.reducer';
import * as CurrentSpell from './reducers/duels/currentSpell.reducer';
import * as Description from './reducers/duels/description.reducer';

const duelsReducers = combineReducers({
  users: Users.reducer,
  effectsWindow: EffectsWindow.reducer,
  muve: Muve.reducer,
  currentSpell: CurrentSpell.reducer,
  description: Description.reducer,
});

export interface State {
  arena: Arena.ArenaState;
  intuition: Intuition.IntuitionState;
  sound: Sound.SoundState;
  duels: {
    users: Users.UsersState;
    effectsWindow: EffectsWindow.EffectsWindowState;
    muve: Muve.MuveState;
    currentSpell: CurrentSpell.CurrentSpellState;
    description: Description.DescriptionState;
  };
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
  intuition: Intuition.reducer,
  sound: Sound.reducer,
  duels: duelsReducers,
};
