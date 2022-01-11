import { createReducer } from '@ngrx/store';

export interface MapState {
  map: (string | number)[][][];
}

// value in each square:
// first - if square is available for walking - '', if not - 'block'
// second - if in square player - 'user' or 'enemy', if not - ''
// third - if on square placed spell string will contain spell name
// fourth - contain spell duration

const initialState: MapState = {
  map: [
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', 'user', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
    [
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', 'enemy', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
  ],
};

export const reducer = createReducer(initialState);
