import { createSelector } from '@ngrx/store';
import { ToolbarState } from '../../reducers/arena/toolbar.reducer';
import { AppState } from '../../state/app.state';

const toolbar = (state: AppState) => state.arena.toolbar;

export const selectFirstPotion = createSelector(
  toolbar,
  (state: ToolbarState) => state.firstHealthPotion
);
