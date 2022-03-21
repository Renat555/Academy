import { createReducer, on } from '@ngrx/store';
import * as Users from '../../actions/duels/users.actions';

function randomString() {
  let string = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
  let result = '';

  for (let i = 0; i < 10; i++) {
    result += string[Math.floor(Math.random() * Math.floor(62))];
  }

  return result;
}

interface UserState {
  name: string;
  id: string;
  enemyType: string;
  actionPoints: number;
  energyPoints: number;
  health: number;
  maxHealth: number;
  forms: string[];
  elements: string[];
  buffs: string[];
  debuffs: string[];
}

interface EnemyState {
  name: string;
  health: number;
  maxHealth: number;
  actionPoints: number;
  energyPoints: number;
  buffs: string[];
  debuffs: string[];
}

export interface UsersState {
  user: UserState;
  enemy: EnemyState;
}

const initialState: UsersState = {
  user: {
    name: '',
    id: randomString(),
    enemyType: '',
    actionPoints: 5,
    energyPoints: 5,
    health: 100,
    maxHealth: 100,
    forms: [],
    elements: [],
    buffs: [],
    debuffs: [],
  },
  enemy: {
    name: '',
    health: 100,
    maxHealth: 100,
    actionPoints: 5,
    energyPoints: 5,
    buffs: [],
    debuffs: [],
  },
};

export const reducer = createReducer(
  initialState,
  on(Users.addUserName, (state, { name }) => ({
    ...state,
    user: { ...state.user, name: name },
  })),
  on(Users.deleteUserName, (state) => ({
    ...state,
    user: { ...state.user, name: '' },
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
  })),
  on(Users.increaseUserHealth, (state, { points }) => ({
    ...state,
    user: { ...state.user, health: state.user.health + points },
  })),
  on(Users.decreaseUserHealth, (state, { points }) => ({
    ...state,
    user: { ...state.user, health: state.user.health - points },
  })),
  on(Users.increaseEnemyHealth, (state, { points }) => ({
    ...state,
    enemy: { ...state.enemy, health: state.enemy.health + points },
  })),
  on(Users.decreaseEnemyHealth, (state, { points }) => ({
    ...state,
    enemy: { ...state.enemy, health: state.enemy.health - points },
  }))
);
