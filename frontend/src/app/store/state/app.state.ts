import { ArenaState } from '../reducers/arena.reducer';
import { AnswersState } from '../reducers/intuition/answers.reducer';
import { SoundState } from '../reducers/sound.reducer';
import { UsersState } from '../reducers/duels/users.reducer';
import { EffectsWindowState } from '../reducers/duels/effectsWindow.reducer';
import { GeneralInfoState } from '../reducers/duels/generalInfo.reducer';
import { CurrentSpellState } from '../reducers/duels/currentSpell.reducer';
import { DescriptionState } from '../reducers/duels/description.reducer';
import { DictionaryState } from '../reducers/duels/dictionary.reducer';
import { MapState } from '../reducers/duels/map.reducer';
import { SpellbookState } from '../reducers/duels/spellBook.reducer';
import { UserState } from '../reducers/user.reducer';
import { PendingState } from '../reducers/pending.reducer';
import { ResultsState } from '../reducers/intuition/results.reducer';

export interface AppState {
  user: UserState;
  arena: ArenaState;
  intuition: {
    answers: AnswersState;
    results: ResultsState;
  };
  sound: SoundState;
  pending: PendingState;
  duels: {
    users: UsersState;
    effectsWindow: EffectsWindowState;
    muve: GeneralInfoState;
    currentSpell: CurrentSpellState;
    description: DescriptionState;
    dictionary: DictionaryState;
    map: MapState;
    spellbook: SpellbookState;
  };
}
