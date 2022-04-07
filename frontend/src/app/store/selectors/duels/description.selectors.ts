import { createSelector } from '@ngrx/store';
import { DescriptionState } from '../../reducers/duels/description.reducer';
import { AppState } from '../../state/app.state';

const description = (state: AppState) => state.duels.description;

export const selectDescription = createSelector(
  description,
  (state: DescriptionState) => {
    return state.description;
  }
);
