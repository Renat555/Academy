import { Action, createReducer, on } from '@ngrx/store';
import * as CreateHeroActions from '../../actions/duels/createHero.actions';

export interface UserState {
  name: string;
  forms: string[];
  elements: string[];
}

const initialState: UserState = {
  name: '',
  forms: [],
  elements: [],
};

export const reducer = createReducer(
  initialState,
  on(CreateHeroActions.createName, (state, { name }) => ({
    ...state,
    name: name,
  })),
  on(CreateHeroActions.addElement, (state, { element }) => {
    let newElements = state.elements.slice();
    newElements.push(element);

    return { ...state, elements: newElements };
  }),
  on(CreateHeroActions.addForm, (state, { form }) => {
    let newForms = state.forms.slice();
    newForms.push(form);

    return { ...state, forms: newForms };
  }),
  on(CreateHeroActions.deleteElement, (state, { element }) => {
    let newElements = state.elements.slice();
    newElements.splice(newElements.indexOf(element), 1);

    return { ...state, elements: newElements };
  }),
  on(CreateHeroActions.deleteForm, (state, { form }) => {
    let newForms = state.forms.slice();
    newForms.splice(newForms.indexOf(form), 1);

    return { ...state, forms: newForms };
  })
);

// export function reducer(state: UserState | undefined, action: Action) {
//   return createHeroReducer(state, action);
// }
