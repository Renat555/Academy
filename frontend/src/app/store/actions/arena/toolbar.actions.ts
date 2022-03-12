import { createAction } from '@ngrx/store';

export enum toolbarActions {
  firstHealthPotionConsume = '[toolbar] firstHealthPotionConsume',
  firstHealthPotionRefill = '[toolbar] firstHealthPotionRefill',
}

export const firstHealthPotionConsume = createAction(
  toolbarActions.firstHealthPotionConsume
);

export const firstHealthPotionRefill = createAction(
  toolbarActions.firstHealthPotionRefill
);
