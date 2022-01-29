import { createAction } from '@ngrx/store';

export enum PendingActions {
  pendingTrue = '[pending] pendingTrue',
  pendingFalse = '[pending] pendingFalse',
}

export const pendingTrue = createAction(PendingActions.pendingTrue);
export const pendingFalse = createAction(PendingActions.pendingFalse);
