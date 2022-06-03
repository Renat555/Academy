import { createAction, props } from '@ngrx/store';

export enum soundActions {
  soundOn = '[sound] soundOn',
  soundOff = '[sound] soundOff',
  soundToggle = '[sound] soundToggle',
}

export const soundOn = createAction(soundActions.soundOn);
export const soundOff = createAction(soundActions.soundOff);
export const soundToggle = createAction(soundActions.soundToggle);
