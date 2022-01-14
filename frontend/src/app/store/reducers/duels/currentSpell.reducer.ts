import { createReducer, on } from '@ngrx/store';
import * as CurrentSpell from '../../actions/duels/currentSpell.actions';

export interface CurrentSpellState {
  form: string;
  element: string;
}

const initialState: CurrentSpellState = {
  form: '',
  element: '',
};

export const reducer = createReducer(
  initialState,
  on(CurrentSpell.addForm, (state, { form }) => ({
    ...state,
    form: form,
  })),
  on(CurrentSpell.addElement, (state, { element }) => ({
    ...state,
    element: element,
  })),
  on(CurrentSpell.deleteForm, (state) => ({
    ...state,
    form: '',
  })),
  on(CurrentSpell.deleteElement, (state) => ({
    ...state,
    element: '',
  }))
);