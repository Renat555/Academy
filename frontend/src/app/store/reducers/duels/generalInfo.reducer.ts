import { createReducer, on } from '@ngrx/store';
import * as GeneralActions from '../../actions/duels/generalInfo.actions';

export interface GeneralInfoState {
  muve: string;
  enemyType: string;
  enemyCreated: boolean;
}

const initialState: GeneralInfoState = {
  muve: '',
  enemyType: '',
  enemyCreated: false,
};

export const reducer = createReducer(
  initialState,
  on(GeneralActions.userMuve, (state) => ({ ...state, muve: 'user' })),
  on(GeneralActions.enemyMuve, (state) => ({ ...state, muve: 'enemy' })),
  on(GeneralActions.humanEnemy, (state) => ({ ...state, enemyType: 'human' })),
  on(GeneralActions.AIEnemy, (state) => ({ ...state, enemyType: 'AI' })),
  on(GeneralActions.enemyCreated, (state) => ({
    ...state,
    enemyCreated: true,
  })),
  on(GeneralActions.enemyNotCreated, (state) => ({
    ...state,
    enemyCreated: false,
  }))
);
