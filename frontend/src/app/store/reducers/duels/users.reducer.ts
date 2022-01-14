import { createReducer, on } from '@ngrx/store';
import * as Users from '../../actions/duels/users.actions';

interface UserState {
  name: string;
  health: number;
  actionPoints: number;
  energyPoints: number;
  effects: string[];
  forms: string[];
  elements: string[];
}

interface EnemyState {
  name: string;
  health: number;
  actionPoints: number;
  energyPoints: number;
  effects: string[];
}

export interface UsersState {
  user: UserState;
  enemy: EnemyState;
}

const initialState: UsersState = {
  user: {
    name: '',
    health: 100,
    actionPoints: 5,
    energyPoints: 5,
    effects: [],
    forms: ['sphere', 'power', 'flow', 'stamp', 'spear'],
    elements: ['water', 'air', 'life'],
  },
  enemy: {
    name: '',
    health: 100,
    actionPoints: 5,
    energyPoints: 5,
    effects: [],
  },
};

export const reducer = createReducer(
  initialState,
  on(Users.addUserName, (state, { name }) => ({
    ...state,
    user: { ...state.user, name: name },
  })),
  on(Users.addEnemyName, (state, { name }) => ({
    ...state,
    enemy: { ...state.enemy, name: name },
  })),
  on(Users.addElement, (state, { element }) => {
    let newElements = state.user.elements.slice();
    newElements.push(element);

    return { ...state, user: { ...state.user, elements: newElements } };
  }),
  on(Users.addForm, (state, { form }) => {
    let newForms = state.user.forms.slice();
    newForms.push(form);

    return { ...state, user: { ...state.user, forms: newForms } };
  }),
  on(Users.deleteElement, (state, { element }) => {
    let newElements = state.user.elements.slice();
    newElements.splice(newElements.indexOf(element), 1);

    return { ...state, user: { ...state.user, elements: newElements } };
  }),
  on(Users.deleteForm, (state, { form }) => {
    let newForms = state.user.forms.slice();
    newForms.splice(newForms.indexOf(form), 1);

    return { ...state, user: { ...state.user, forms: newForms } };
  }),
  on(Users.changeUserActionPoints, (state, { points }) => ({
    ...state,
    user: { ...state.user, actionPoints: points },
  })),
  on(Users.changeEnemyActionPoints, (state, { points }) => ({
    ...state,
    enemy: { ...state.enemy, actionPoints: points },
  })),
  on(Users.changeUserEnergyPoints, (state, { points }) => ({
    ...state,
    user: { ...state.user, energyPoints: points },
  })),
  on(Users.changeEnemyEnergyPoints, (state, { points }) => ({
    ...state,
    enemy: { ...state.enemy, energyPoints: points },
  }))
);
