import { createAction, props } from '@ngrx/store';

export enum descriptionActions {
  addDescriptionBlock = '[description] addDescriptionBlock',
  addDescriptionRow = '[description] addDescriptionRow',
}

export const addDescriptionBlock = createAction(
  descriptionActions.addDescriptionBlock,
  props<{ description: string }>()
);

export const addDescriptionRow = createAction(
  descriptionActions.addDescriptionRow,
  props<{ description: string }>()
);
