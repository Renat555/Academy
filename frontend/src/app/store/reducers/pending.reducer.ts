import { createReducer, on } from '@ngrx/store';
import * as PendingActions from '../actions/pending.actions';

export interface PendingState {
  isPending: boolean;
}

const initialState: PendingState = {
  isPending: false,
};

export const reducer = createReducer(
  initialState,
  on(PendingActions.pendingTrue, (state) => ({ isPending: true })),
  on(PendingActions.pendingFalse, (state) => ({ isPending: false }))
);
