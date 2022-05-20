import { state } from '@angular/animations';
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
// fifth - show is spell prepared or approved

const initialState: MapState = {
  map: [
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['block', 'user', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
    ],
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
    ],
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
    ],
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
    ],
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
    ],
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
    ],
    [
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['block', 'enemy', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
      ['', '', '', 0, ''],
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
  }),
  on(Map.setEnemy, (state, { row, col }) => {
    let map = deepCopy(state.map);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j][1] === 'enemy') {
          map[i][j][0] = '';
          map[i][j][1] = '';
        }
      }
    }

    map[row][col][0] = 'block';
    map[row][col][1] = 'enemy';

    return { map: [...map] };
  }),
  on(Map.spellPreparing, (state, { spell, coordinates }) => {
    let map = deepCopy(state.map);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j][4] === 'prepared') {
          map[i][j][0] = '';
          map[i][j][2] = '';
          map[i][j][4] = '';
        }
      }
    }

    for (let i = 0; i < coordinates.length; i++) {
      if (spell === 'earthshield') {
        map[coordinates[i][0]][coordinates[i][1]][0] = 'block';
      }
      map[coordinates[i][0]][coordinates[i][1]][2] = spell;
      map[coordinates[i][0]][coordinates[i][1]][4] = 'prepared';
    }

    return { map: [...map] };
  }),
  on(Map.spellApproval, (state, { spell, duration }) => {
    let map = deepCopy(state.map);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j][4] === 'prepared') {
          map[i][j][3] = duration;
          map[i][j][4] = 'approved';
        }
      }
    }

    return { map: [...map] };
  }),
  on(Map.deletePreparedSpells, (state) => {
    let map = deepCopy(state.map);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j][4] === 'prepared') {
          map[i][j][0] = '';
          map[i][j][2] = '';
          map[i][j][4] = '';
        }
      }
    }

    return { map: [...map] };
  })
);
