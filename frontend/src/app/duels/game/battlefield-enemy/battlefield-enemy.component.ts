import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectEnemyActionPoints,
  selectEnemyEnergyPoints,
  selectEnemyHealth,
  selectEnemyMaxHealth,
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

    this.store.select(selectEnemyHealth).subscribe((state) => {
      this.health = state;
    });

    this.store.select(selectEnemyMaxHealth).subscribe((state) => {
      this.maxHealth = state;
    });
  }

  health = 0;
  maxHealth = 0;

  name = '';

  actionPoints = 0;
  energyPoints = 0;
}
