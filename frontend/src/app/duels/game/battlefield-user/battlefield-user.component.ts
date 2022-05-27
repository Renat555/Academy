import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DictionaryState } from 'src/app/store/reducers/duels/dictionary.reducer';
import { selectDictionary } from 'src/app/store/selectors/duels/dictionary.selectors';
import {
  selectElements,
  selectForms,
  selectUserHealth,
  selectUserMaxHealth,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-user',
  templateUrl: './battlefield-user.component.html',
  styleUrls: ['./battlefield-user.component.less'],
})
export class BattlefieldUserComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  health = 0;
  maxHealth = 0;

  firstForm = '';
  firstFormRussianName = '';
  secondForm = '';
  secondFormRussianName = '';
  thirdForm = '';
  thirdFormRussianName = '';
  fourthForm = '';
  fourthFormRussianName = '';
  fifthForm = '';
  fifthFormRussianName = '';

  firstElement = '';
  firstElementRussianName = '';
  secondElement = '';
  secondElementRussianName = '';
  thirdElement = '';
  thirdElementRussianName = '';

  dictionarySubscription = new Subscription();
  userHealthSubscription = new Subscription();
  userMaxHealthSubscription = new Subscription();
  formsSubscription = new Subscription();

  ngOnInit(): void {
    let dictionary: DictionaryState;

    this.dictionarySubscription = this.store
      .select(selectDictionary)
      .subscribe((state) => {
        dictionary = state;
      });

    this.userHealthSubscription = this.store
      .select(selectUserHealth)
      .subscribe((userHealth) => {
        this.health = userHealth;
      });

    this.userMaxHealthSubscription = this.store
      .select(selectUserMaxHealth)
      .subscribe((userMaxHealth) => {
        this.maxHealth = userMaxHealth;
      });

    this.formsSubscription = this.store
      .select(selectForms)
      .subscribe((forms) => {
        this.firstForm = forms[0];
        this.secondForm = forms[1];
        this.thirdForm = forms[2];
        this.fourthForm = forms[3];
        this.fifthForm = forms[4];

        this.firstFormRussianName =
          dictionary[forms[0] as keyof DictionaryState];
        this.secondFormRussianName =
          dictionary[forms[1] as keyof DictionaryState];
        this.thirdFormRussianName =
          dictionary[forms[2] as keyof DictionaryState];
        this.fourthFormRussianName =
          dictionary[forms[3] as keyof DictionaryState];
        this.fifthFormRussianName =
          dictionary[forms[4] as keyof DictionaryState];
      });

    this.store.select(selectElements).subscribe((elements) => {
      this.firstElement = elements[0];
      this.secondElement = elements[1];
      this.thirdElement = elements[2];

      this.firstElementRussianName =
        dictionary[elements[0] as keyof DictionaryState];
      this.secondElementRussianName =
        dictionary[elements[1] as keyof DictionaryState];
      this.thirdElementRussianName =
        dictionary[elements[2] as keyof DictionaryState];
    });
  }

  ngOnDestroy(): void {
    this.dictionarySubscription.unsubscribe();
    this.userHealthSubscription.unsubscribe();
    this.userMaxHealthSubscription.unsubscribe();
    this.formsSubscription.unsubscribe();
  }
}
