import { createSelector } from '@ngrx/store';
import { DictionaryState } from '../../reducers/duels/dictionary.reducer';
import { AppState } from '../../state/app.state';

const dictionary = (state: AppState) => state.duels.dictionary;

export const selectDictionary = createSelector(
  dictionary,
  (state: DictionaryState) => state
);
