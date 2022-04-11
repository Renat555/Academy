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
  buffs: { name: string; duration: number }[];
  debuffs: { name: string; duration: number }[];
}

interface EnemyState {
  name: string;
  health: number;
  maxHealth: number;
  actionPoints: number;
  energyPoints: number;
  buffs: { name: string; duration: number }[];
  debuffs: { name: string; duration: number }[];
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
    actionPoints: 0,
    energyPoints: 0,
    health: 0,
    maxHealth: 0,
    forms: [],
    elements: [],
    buffs: [],
    debuffs: [],
  },
  enemy: {
    name: '',
    health: 0,
    maxHealth: 0,
    actionPoints: 0,
    energyPoints: 0,
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
  on(Users.setUserHealth, (state, { health }) => ({
    ...state,
    user: { ...state.user, health: health },
  })),
  on(Users.setEnemyHealth, (state, { health }) => ({
    ...state,
    enemy: { ...state.enemy, health: health },
  })),
  on(Users.setUserMaxHealth, (state, { health }) => ({
    ...state,
    user: { ...state.user, maxHealth: health },
  })),
  on(Users.setEnemyMaxHealth, (state, { health }) => ({
    ...state,
    enemy: { ...state.enemy, maxHealth: health },
  })),
  on(Users.setUserBuffs, (state, { userBuffs }) => {
    let newBuffs: { name: string; duration: number }[] = [];
    for (let i = 0; i < userBuffs.length; i++) {
      newBuffs[i] = { name: '', duration: 0 };
      newBuffs[i]['name'] = userBuffs[i][0];
      newBuffs[i]['duration'] = userBuffs[i][1];
    }
    return { ...state, user: { ...state.user, buffs: newBuffs } };
  }),
  on(Users.setUserDebuffs, (state, { userDebuffs }) => {
    let newDebuffs: { name: string; duration: number }[] = [];
    for (let i = 0; i < userDebuffs.length; i++) {
      newDebuffs[i] = { name: '', duration: 0 };
      newDebuffs[i]['name'] = userDebuffs[i][0];
      newDebuffs[i]['duration'] = userDebuffs[i][1];
    }
    return { ...state, user: { ...state.user, debuffs: newDebuffs } };
  }),
  on(Users.setEnemyBuffs, (state, { enemyBuffs }) => {
    let newBuffs: { name: string; duration: number }[] = [];
    for (let i = 0; i < enemyBuffs.length; i++) {
      newBuffs[i] = { name: '', duration: 0 };
      newBuffs[i]['name'] = enemyBuffs[i][0];
      newBuffs[i]['duration'] = enemyBuffs[i][1];
    }
    return { ...state, enemy: { ...state.enemy, buffs: newBuffs } };
  }),
  on(Users.setEnemyDebuffs, (state, { enemyDebuffs }) => {
    let newDebuffs: { name: string; duration: number }[] = [];
    for (let i = 0; i < enemyDebuffs.length; i++) {
      newDebuffs[i] = { name: '', duration: 0 };
      newDebuffs[i]['name'] = enemyDebuffs[i][0];
      newDebuffs[i]['duration'] = enemyDebuffs[i][1];
    }
    return { ...state, enemy: { ...state.enemy, debuffs: newDebuffs } };
  })
);
