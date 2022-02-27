import { createReducer } from '@ngrx/store';

export interface DictionaryState {
  fire: string;
  water: string;
  earth: string;
  air: string;
  life: string;
  death: string;
  spear: string;
  shield: string;
  crown: string;
  source: string;
  sphere: string;
  stamp: string;
  key: string;
  flow: string;
  power: string;
}

const initialState: DictionaryState = {
  fire: 'Огонь',
  water: 'Вода',
  earth: 'Земля',
  air: 'Воздух',
  life: 'Жизнь',
  death: 'Смерть',
  spear: 'Копье',
  shield: 'Щит',
  crown: 'Корона',
  source: 'Источник',
  sphere: 'Сфера',
  stamp: 'Печать',
  key: 'Ключ',
  flow: 'Поток',
  power: 'Власть',
};

export const reducer = createReducer(initialState);
