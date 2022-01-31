import { createSelector } from '@ngrx/store';
import { ResultsState } from '../../reducers/intuition/results.reducer';
import { AppState } from '../../state/app.state';

const results = (state: AppState) => state.intuition.results;

export const selectFigures = createSelector(
  results,
  (state: ResultsState) => state.figures
);

export const selectCardSuits = createSelector(
  results,
  (state: ResultsState) => state.cardSuits
);

export const selectColors = createSelector(
  results,
  (state: ResultsState) => state.colors
);

export const selectBlackWhite = createSelector(
  results,
  (state: ResultsState) => state.blackWhite
);

export const selectPlayingCards = createSelector(
  results,
  (state: ResultsState) => state.playingCards
);
