import { createSelector } from '@ngrx/store';
import { DescriptionState } from '../../reducers/duels/description.reducer';
import { AppState } from '../../state/app.state';

const description = (state: AppState) => state.duels.description;

export const selectDescription = createSelector(
  description,
  (state: DescriptionState) => {
    let desc = state.description;
    let descForDisplay = '';

    for (let i = 0; i < desc.length; i++) {
      for (let j = 0; j < desc[i].length; j++) {
        descForDisplay += desc[i][j] + '\n';
      }
      descForDisplay += '\u269C \u269C \u269C \u269C \u269C \n';
    }
    return descForDisplay;
  }
);
