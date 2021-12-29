import { createAction, props } from '@ngrx/store';

export enum effectsWindowActions {
  showEffects = '[effectsWindow] showEffects',
  hideEffects = '[effectsWindow] hideEffects',
}

export const showEffects = createAction(effectsWindowActions.showEffects);
export const hideEffects = createAction(effectsWindowActions.hideEffects);
