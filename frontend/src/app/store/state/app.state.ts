import { ArenaState } from '../reducers/arena.reducer';
import { IntuitionState } from '../reducers/intuition.reducer';
import { SoundState } from '../reducers/sound.reducer';
import { UserState } from '../reducers/duels/createHero.reducer'

export interface AppState {
  arena: ArenaState;
  intuition: IntuitionState;
  sound: SoundState;
  createHero: UserState;
}
