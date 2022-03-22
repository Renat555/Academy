import { createSelector } from '@ngrx/store';
import { GeneralInfoState } from '../../reducers/duels/generalInfo.reducer';
import { AppState } from '../../state/app.state';

const muve = (state: AppState) => state.duels.muve;

export const selectMuve = createSelector(
  muve,
  (state: GeneralInfoState) => state.muve
);

export const selectEnemyType = createSelector(
  muve,
  (state: GeneralInfoState) => state.enemyType
);

export const selectIsEnemyCreated = createSelector(
  muve,
  (state: GeneralInfoState) => state.enemyCreated
);
