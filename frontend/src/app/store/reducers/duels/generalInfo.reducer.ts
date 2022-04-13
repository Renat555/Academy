import { createReducer, on } from '@ngrx/store';
import * as GeneralActions from '../../actions/duels/generalInfo.actions';

export interface GeneralInfoState {
  move: string;
  enemyType: string;
  enemyCreated: boolean;
}

const initialState: GeneralInfoState = {
  move: '',
  enemyType: '',
  enemyCreated: false,
};

export const reducer = createReducer(
  initialState,
  on(GeneralActions.userMove, (state) => ({ ...state, move: 'user' })),
  on(GeneralActions.enemyMove, (state) => ({ ...state, move: 'enemy' })),
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
