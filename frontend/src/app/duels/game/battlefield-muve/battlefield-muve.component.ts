import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMuve } from 'src/app/store/selectors/duels/generalInfo.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-muve',
  templateUrl: './battlefield-muve.component.html',
  styleUrls: ['./battlefield-muve.component.less'],
})
export class BattlefieldMuveComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectMuve).subscribe((state) => {
      if (state == 'user') {
        this.isUserMuve = true;
        this.isEnemyMuve = false;
      } else {
        this.isUserMuve = false;
        this.isEnemyMuve = true;
      }
    });
  }

  isUserMuve = false;
  isEnemyMuve = false;
}
