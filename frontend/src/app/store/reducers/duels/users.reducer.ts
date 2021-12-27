import { Action, createReducer, on } from '@ngrx/store';
import * as CreateHeroActions from '../../actions/duels/users.actions';

interface UserState {
  name: string;
  forms: string[];
  elements: string[];
  effects: string[];
}

interface EnemyState {
  name: string;
  effects: string[];
}

export interface UsersState {
  user: UserState;
  enemy: EnemyState;
}

const initialState: UsersState = {
  user: {
    name: '',
    forms: [],
    elements: [],
    effects: [],
  },
  enemy: {
    name: '',
    effects: [],
  },
};

export const reducer = createReducer(
  initialState,
  on(CreateHeroActions.createName, (state, { name }) => ({
    ...state,
    user: {
      ...state.user,
      name: name,
    },
  })),
  on(CreateHeroActions.addElement, (state, { element }) => {
    let newElements = state.user.elements.slice();
    newElements.push(element);

    return { ...state, user: { ...state.user, elements: newElements } };
  }),
  on(CreateHeroActions.addForm, (state, { form }) => {
    let newForms = state.user.forms.slice();
    newForms.push(form);

    return { ...state, user: { ...state.user, forms: newForms } };
  }),
  on(CreateHeroActions.deleteElement, (state, { element }) => {
    let newElements = state.user.elements.slice();
    newElements.splice(newElements.indexOf(element), 1);

    return { ...state, user: { ...state.user, elements: newElements } };
  }),
  on(CreateHeroActions.deleteForm, (state, { form }) => {
    let newForms = state.user.forms.slice();
    newForms.splice(newForms.indexOf(form), 1);

    return { ...state, user: { ...state.user, forms: newForms } };
  })
);
