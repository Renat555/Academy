import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as Description from './../../actions/duels/description.actions';

export interface DescriptionState {
  description: string[];
}

const initialState: DescriptionState = {
  description: [],
};

export const reducer = createReducer(
  initialState,
  on(Description.addDescriptionBlock, (state, { description }) => {
    state.description.push(description);
    return { ...state, description: [...state.description] };
  }),
  on(Description.addDescriptionRow, (state, { description }) => {
    if (state.description.length === 0) {
      state.description.push(description);
    } else {
      let last = state.description[state.description.length - 1];
      last = last + '<br>' + description;
      state.description.pop();
      state.description.push(last);
    }
    return { ...state, description: [...state.description] };
  })
);
