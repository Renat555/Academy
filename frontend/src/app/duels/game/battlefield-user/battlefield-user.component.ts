import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserHealth } from 'src/app/store/selectors/arena.selector';
import {
  selectElements,
  selectForms,
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
    this.store.select(selectUserHealth).subscribe((state) => {
      this.healthPercent = state + '%';
    });

    this.store.select(selectForms).subscribe((state) => {
      this.firstForm = state[0];
      this.secondForm = state[1];
      this.thirdForm = state[2];
      this.fourthForm = state[3];
      this.fifthForm = state[4];
    });

    this.store.select(selectElements).subscribe((state) => {
      this.firstElement = state[0];
      this.secondElement = state[1];
      this.thirdElement = state[2];
    });
  }

  healthPercent = '';

  firstForm = '';
  secondForm = '';
  thirdForm = '';
  fourthForm = '';
  fifthForm = '';

  firstElement = '';
  secondElement = '';
  thirdElement = '';
}
