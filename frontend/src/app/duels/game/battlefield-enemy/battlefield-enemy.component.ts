import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectEnemyActionPoints,
  selectEnemyEnergyPoints,
  selectEnemyName,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-enemy',
  templateUrl: './battlefield-enemy.component.html',
  styleUrls: ['./battlefield-enemy.component.less'],
})
export class BattlefieldEnemyComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectEnemyName).subscribe((name) => {
      this.name = name;
    });

    this.store.select(selectEnemyActionPoints).subscribe((actionPoints) => {
      this.actionPoints = actionPoints;
    });

    this.store.select(selectEnemyEnergyPoints).subscribe((energyPoints) => {
      this.energyPoints = energyPoints;
    });
  }

  healthPercent = '100%';

  name = '';

  actionPoints = 0;
  energyPoints = 0;
}
