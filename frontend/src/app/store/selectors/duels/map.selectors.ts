import { createSelector } from '@ngrx/store';
import { MapState } from '../../reducers/duels/map.reducer';
import { AppState } from '../../state/app.state';

const map = (state: AppState) => state.duels.map;

export const selectMapUser = createSelector(map, (state: MapState) => {
  let map = state.map;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j][1] === 'user') {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
});

export const selectMapEnemy = createSelector(map, (state: MapState) => {
  let map = state.map;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j][1] === 'enemy') {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
});

export const selectAllMap = createSelector(map, (state: MapState) => {
  return state.map;
});
