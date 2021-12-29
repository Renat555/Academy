import { createAction, props } from '@ngrx/store';

export enum soundActions {
  soundOn = '[sound] soundOn',
  soundOff = '[sound] soundOff',
}

export const soundOn = createAction(soundActions.soundOn);
export const soundOff = createAction(soundActions.soundOff);
