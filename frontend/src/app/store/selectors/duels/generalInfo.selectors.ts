import { createSelector } from '@ngrx/store';
import { GeneralInfoState } from '../../reducers/duels/generalInfo.reducer';
import { AppState } from '../../state/app.state';

const muve = (state: AppState) => state.duels.move;

export const selectMuve = createSelector(
  muve,
  (state: GeneralInfoState) => state.move
);

export const selectEnemyType = createSelector(
  muve,
  (state: GeneralInfoState) => state.enemyType
);

export const selectIsEnemyCreated = createSelector(
  muve,
  (state: GeneralInfoState) => state.enemyCreated
);
