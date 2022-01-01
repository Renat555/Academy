import { ArenaState } from '../reducers/arena.reducer';
import { IntuitionState } from '../reducers/intuition.reducer';
import { SoundState } from '../reducers/sound.reducer';
import { UsersState } from '../reducers/duels/users.reducer';
import { EffectsWindowState } from '../reducers/duels/effectsWindow.reducer';
import { MuveState } from '../reducers/duels/muve.reducer';
import { CurrentSpellState } from '../reducers/duels/currentSpell.reducer';
import { DescriptionState } from '../reducers/duels/description.reducer';

export interface AppState {
  arena: ArenaState;
  intuition: IntuitionState;
  sound: SoundState;
  duels: {
    users: UsersState;
    effectsWindow: EffectsWindowState;
    muve: MuveState;
    currentSpell: CurrentSpellState;
    description: DescriptionState;
  };
}
