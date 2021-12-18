import { ActionReducerMap } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Intuition from './reducers/intuition.reducer';
import * as Sound from './reducers/sound.reducer';
import * as CreateHero from './reducers/duels/createHero.reducer'

export interface State {
  arena: Arena.ArenaState;
  intuition: Intuition.IntuitionState;
  sound: Sound.SoundState;
  createHero: CreateHero.UserState;
}

export const reducers: ActionReducerMap<State> = {
  arena: Arena.reducer,
  intuition: Intuition.reducer,
  sound: Sound.reducer,
  createHero: CreateHero.reducer
};
