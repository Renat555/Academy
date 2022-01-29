import { ArenaState } from '../reducers/arena.reducer';
import { IntuitionState } from '../reducers/intuition.reducer';
import { SoundState } from '../reducers/sound.reducer';
import { UsersState } from '../reducers/duels/users.reducer';
import { EffectsWindowState } from '../reducers/duels/effectsWindow.reducer';
import { MuveState } from '../reducers/duels/muve.reducer';
import { CurrentSpellState } from '../reducers/duels/currentSpell.reducer';
import { DescriptionState } from '../reducers/duels/description.reducer';
import { DictionaryState } from '../reducers/duels/dictionary.reducer';
import { MapState } from '../reducers/duels/map.reducer';
import { SpellbookState } from '../reducers/duels/spellBook.reducer';
import { UserState } from '../reducers/user.reducer';
import { PendingState } from '../reducers/pending.reducer';

export interface AppState {
  user: UserState;
  arena: ArenaState;
  intuition: IntuitionState;
  sound: SoundState;
  pending: PendingState;
  duels: {
    users: UsersState;
    effectsWindow: EffectsWindowState;
    muve: MuveState;
    currentSpell: CurrentSpellState;
    description: DescriptionState;
    dictionary: DictionaryState;
    map: MapState;
    spellbook: SpellbookState;
  };
}
