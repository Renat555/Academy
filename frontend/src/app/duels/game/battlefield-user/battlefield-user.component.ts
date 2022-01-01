import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserHealth } from 'src/app/store/selectors/arena.selector';
import {
  selectElements,
  selectForms,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

interface Dictionary {
  fire: string;
  water: string;
  earth: string;
  air: string;
  life: string;
  death: string;
  spear: string;
  shild: string;
  crown: string;
  source: string;
  sphere: string;
  stamp: string;
  key: string;
  flow: string;
  power: string;
}

const dictionary: Dictionary = {
  fire: 'Огонь',
  water: 'Вода',
  earth: 'Земля',
  air: 'Воздух',
  life: 'Жизнь',
  death: 'Смерть',
  spear: 'Копье',
  shild: 'Щит',
  crown: 'Корона',
  source: 'Источник',
  sphere: 'Сфера',
  stamp: 'Печать',
  key: 'Ключ',
  flow: 'Поток',
  power: 'Власть',
};

@Component({
  selector: 'app-battlefield-user',
  templateUrl: './battlefield-user.component.html',
  styleUrls: ['./battlefield-user.component.less'],
})
export class BattlefieldUserComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectUserHealth).subscribe((state) => {
      this.healthPercent = state + '%';
    });

    this.store.select(selectForms).subscribe((state) => {
      this.firstForm = state[0];
      this.secondForm = state[1];
      this.thirdForm = state[2];
      this.fourthForm = state[3];
      this.fifthForm = state[4];

      this.firstFormInRussian = dictionary[state[0] as keyof Dictionary];
      this.secondFormInRussian = dictionary[state[1] as keyof Dictionary];
      this.thirdFormInRussian = dictionary[state[2] as keyof Dictionary];
      this.fourthFormInRussian = dictionary[state[3] as keyof Dictionary];
      this.fifthFormInRussian = dictionary[state[4] as keyof Dictionary];
    });

    this.store.select(selectElements).subscribe((state) => {
      this.firstElement = state[0];
      this.secondElement = state[1];
      this.thirdElement = state[2];

      this.firstElementInRussian = dictionary[state[0] as keyof Dictionary];
      this.secondElementInRussian = dictionary[state[1] as keyof Dictionary];
      this.thirdElementInRussian = dictionary[state[2] as keyof Dictionary];
    });
  }

  healthPercent = '';

  firstForm = '';
  firstFormInRussian = '';
  secondForm = '';
  secondFormInRussian = '';
  thirdForm = '';
  thirdFormInRussian = '';
  fourthForm = '';
  fourthFormInRussian = '';
  fifthForm = '';
  fifthFormInRussian = '';

  firstElement = '';
  firstElementInRussian = '';
  secondElement = '';
  secondElementInRussian = '';
  thirdElement = '';
  thirdElementInRussian = '';
}
