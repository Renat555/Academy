import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DictionaryState } from 'src/app/store/reducers/duels/dictionary.reducer';
import { selectDictionary } from 'src/app/store/selectors/duels/dictionary.selectors';
import {
  selectElements,
  selectForms,
  selectUserHealth,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-user',
  templateUrl: './battlefield-user.component.html',
  styleUrls: ['./battlefield-user.component.less'],
})
export class BattlefieldUserComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    let dictionary: DictionaryState;

    this.store.select(selectDictionary).subscribe((state) => {
      dictionary = state;
    });

    this.store.select(selectUserHealth).subscribe((state) => {
      this.healthPercent = state + '%';
    });

    this.store.select(selectForms).subscribe((state) => {
      this.firstForm = state[0];
      this.secondForm = state[1];
      this.thirdForm = state[2];
      this.fourthForm = state[3];
      this.fifthForm = state[4];

      this.firstFormInRussian = dictionary[state[0] as keyof DictionaryState];
      this.secondFormInRussian = dictionary[state[1] as keyof DictionaryState];
      this.thirdFormInRussian = dictionary[state[2] as keyof DictionaryState];
      this.fourthFormInRussian = dictionary[state[3] as keyof DictionaryState];
      this.fifthFormInRussian = dictionary[state[4] as keyof DictionaryState];
    });

    this.store.select(selectElements).subscribe((state) => {
      this.firstElement = state[0];
      this.secondElement = state[1];
      this.thirdElement = state[2];

      this.firstElementInRussian =
        dictionary[state[0] as keyof DictionaryState];
      this.secondElementInRussian =
        dictionary[state[1] as keyof DictionaryState];
      this.thirdElementInRussian =
        dictionary[state[2] as keyof DictionaryState];
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
