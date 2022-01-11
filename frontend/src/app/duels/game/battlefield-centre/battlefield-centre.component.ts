import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { showEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import {
  selectEnemyEnergyPoints,
  selectUserActionPoints,
  selectUserEnergyPoints,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-centre',
  templateUrl: './battlefield-centre.component.html',
  styleUrls: ['./battlefield-centre.component.less'],
})
export class BattlefieldCentreComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectUserEnergyPoints).subscribe((state) => {
      this.energyPoints = state;
    });

    this.store.select(selectUserActionPoints).subscribe((state) => {
      this.actionPoints = state;
    });
  }

  showEffects() {
    this.store.dispatch(showEffects());
  }

  energyPoints = 0;
  actionPoints = 0;
}
