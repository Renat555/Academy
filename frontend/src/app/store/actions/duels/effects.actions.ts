import { createAction, props } from '@ngrx/store';

export enum testActions {
  testElement = '[choose] addElement',
}

export const testElement = createAction(
  testActions.testElement,
  props<{ number: number }>()
);
