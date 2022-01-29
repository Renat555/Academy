import { createSelector } from '@ngrx/store';
import { PendingState } from '../reducers/pending.reducer';
import { AppState } from '../state/app.state';

const pending = (state: AppState) => state.pending;

export const selectPending = createSelector(
  pending,
  (state: PendingState) => state.isPending
);
