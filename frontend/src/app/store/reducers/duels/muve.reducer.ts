import { createReducer, on } from '@ngrx/store';
import * as MuveActions from '../../actions/duels/muve.actions';

export interface MuveState {
  muve: string;
}

const initialState: MuveState = {
  muve: 'user',
};

export const reducer = createReducer(
  initialState,
  on(MuveActions.userMuve, (state) => ({ muve: 'user' })),
  on(MuveActions.enemyMuve, (state) => ({ muve: 'enemy' }))
);
