import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as CurrentSpell from '../../actions/duels/currentSpell.actions';

interface BattlefieldSpell {
  name: string;
  coordinates: number[][];
}

export interface CurrentSpellState {
  form: string;
  element: string;
  despell: string;
  battlefieldSpell: BattlefieldSpell;
}

const initialState: CurrentSpellState = {
  form: '',
  element: '',
  despell: '',
  battlefieldSpell: {
    name: '',
    coordinates: [],
  },
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
  })),
  on(CurrentSpell.addDespell, (state, { despell }) => ({
    ...state,
    despell: despell,
  })),
  on(CurrentSpell.deleteDespell, (state) => ({
    ...state,
    despell: '',
  })),
  on(
    CurrentSpell.addBattlefieldSpell,
    (state, { battlefieldSpell, coordinates }) => ({
      ...state,
      battlefieldSpell: {
        name: battlefieldSpell,
        coordinates: coordinates,
      },
    })
  ),
  on(CurrentSpell.deleteBattlefieldSpell, (state) => ({
    ...state,
    battlefieldSpell: {
      name: '',
      coordinates: [],
    },
  }))
);
