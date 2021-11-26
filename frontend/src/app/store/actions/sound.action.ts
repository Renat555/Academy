import { createAction, props } from '@ngrx/store';

export enum soundAction {
  soundOn = '[sound] soundOn',
  soundOff = '[sound] soundOff',
}

export const soundOn = createAction(soundAction.soundOn);
export const soundOff = createAction(soundAction.soundOff);
