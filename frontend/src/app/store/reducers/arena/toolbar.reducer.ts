import { createReducer, on } from '@ngrx/store';
import * as ToolbarActions from '../../actions/arena/toolbar.actions';

export interface ToolbarState {
  firstHealthPotion: boolean;
}

const initialState: ToolbarState = {
  firstHealthPotion: true,
};

export const reducer = createReducer(
  initialState,
  on(ToolbarActions.firstHealthPotionConsume, (state) => ({
    ...state,
    firstHealthPotion: false,
  })),
  on(ToolbarActions.firstHealthPotionRefill, (state) => ({
    ...state,
    firstHealthPotion: true,
  }))
);
