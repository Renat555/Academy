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
import { ArenaUsersState } from '../reducers/arena/health.reducer';
import { ToolbarState } from '../reducers/arena/toolbar.reducer';

export interface AppState {
  user: UserState;
  arena: {
    health: ArenaUsersState;
    toolbar: ToolbarState;
  };
  intuition: {
    answers: AnswersState;
    results: ResultsState;
  };
  sound: SoundState;
  pending: PendingState;
  duels: {
    users: UsersState;
    effectsWindow: EffectsWindowState;
    move: GeneralInfoState;
    currentSpell: CurrentSpellState;
    description: DescriptionState;
    dictionary: DictionaryState;
    map: MapState;
    spellbook: SpellbookState;
  };
}
