import { ActionReducerMap, combineReducers } from '@ngrx/store';
import * as Arena from './reducers/arena.reducer';
import * as Answers from './reducers/intuition/answers.reducer';
import * as Results from './reducers/intuition/results.reducer';
import * as Sound from './reducers/sound.reducer';
import * as Users from './reducers/duels/users.reducer';
import * as EffectsWindow from './reducers/duels/effectsWindow.reducer';
import * as Muve from './reducers/duels/muve.reducer';
import * as CurrentSpell from './reducers/duels/currentSpell.reducer';
import * as Description from './reducers/duels/description.reducer';
import * as Dictionary from './reducers/duels/dictionary.reducer';
import * as Map from './reducers/duels/map.reducer';
import * as Spellbook from './reducers/duels/spellBook.reducer';
import * as User from './reducers/user.reducer';
import * as Pending from './reducers/pending.reducer';

const duelsReducers = combineReducers({
  users: Users.reducer,
  effectsWindow: EffectsWindow.reducer,
  muve: Muve.reducer,
  currentSpell: CurrentSpell.reducer,
  description: Description.reducer,
  dictionary: Dictionary.reducer,
  map: Map.reducer,
  spellbook: Spellbook.reducer,
});

const intuitionReducers = combineReducers({
  answers: Answers.reducer,
  results: Results.reducer,
});

export interface State {
  user: User.UserState;
  arena: Arena.ArenaState;
  intuition: {
    answers: Answers.AnswersState;
    results: Results.ResultsState;
  };
  sound: Sound.SoundState;
  pending: Pending.PendingState;
  duels: {
    users: Users.UsersState;
    effectsWindow: EffectsWindow.EffectsWindowState;
    muve: Muve.MuveState;
    currentSpell: CurrentSpell.CurrentSpellState;
    description: Description.DescriptionState;
    dictionary: Dictionary.DictionaryState;
    map: Map.MapState;
    spellbook: Spellbook.SpellbookState;
  };
}

export const reducers: ActionReducerMap<State> = {
  user: User.reducer,
  arena: Arena.reducer,
  intuition: intuitionReducers,
  sound: Sound.reducer,
  pending: Pending.reducer,
  duels: duelsReducers,
};
