import { createReducer, on } from '@ngrx/store';
import * as ResultsActions from '../../actions/intuition/results.actions';

export interface Result {
  id: number;
  correct: number;
  wrong: number;
  mode: string;
  date: string;
}

export interface ResultsState {
  figures: Result[];
  cardSuits: Result[];
  colors: Result[];
  blackWhite: Result[];
  playingCards: Result[];
}

const initialState: ResultsState = {
  figures: [],
  cardSuits: [],
  colors: [],
  blackWhite: [],
  playingCards: [],
};

export const reducer = createReducer(
  initialState,
  on(ResultsActions.addResults, (state, { results: result }) => {
    let figures = [];
    let cardSuits = [];
    let colors = [];
    let blackWhite = [];
    let playingCards = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i]['mode'] === 'figures') {
        figures.push(result[i]);
      } else if (result[i]['mode'] === 'playing-cards') {
        playingCards.push(result[i]);
      } else if (result[i]['mode'] === 'card-suits') {
        cardSuits.push(result[i]);
      } else if (result[i]['mode'] === 'black-white') {
        blackWhite.push(result[i]);
      } else if (result[i]['mode'] === 'colors') {
        colors.push(result[i]);
      }
    }

    return {
      figures: figures,
      cardSuits: cardSuits,
      blackWhite: blackWhite,
      colors: colors,
      playingCards: playingCards,
    };
  })
);
