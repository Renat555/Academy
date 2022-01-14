import { createReducer, on } from '@ngrx/store';
import * as Map from './../../actions/duels/map.actions';

export interface MapState {
  map: (string | number)[][][];
}

function deepCopy(arr: (string | number)[][][]) {
  let arrResult: (string | number)[][][] = [];

  for (let i = 0; i < arr.length; i++) {
    arrResult[i] = [...arr[i]];
    for (let j = 0; j < arr[i].length; j++) {
      arrResult[i][j] = [...arr[i][j]];
    }
  }

  return arrResult;
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
      ['block', 'user', '', 0],
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
      ['block', 'enemy', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
      ['', '', '', 0],
    ],
  ],
};

export const reducer = createReducer(
  initialState,
  on(Map.setUser, (state, { row, col }) => {
    let map = deepCopy(state.map);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j][1] === 'user') {
          map[i][j][0] = '';
          map[i][j][1] = '';
        }
      }
    }

    map[row][col][0] = 'block';
    map[row][col][1] = 'user';

    return { map: [...map] };
  })
);
