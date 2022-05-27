import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
export class BattlefieldEnemyComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  health = 0;
  maxHealth = 0;

  name = '';

  actionPoints = 0;
  energyPoints = 0;

  enemyNameSubscription = new Subscription();
  actionPointsSubscription = new Subscription();
  enemyEnergyPointsSubscription = new Subscription();
  enemyHealthSubscription = new Subscription();
  enemyMaxHealthSubscription = new Subscription();

  ngOnInit(): void {
    this.enemyNameSubscription = this.store
      .select(selectEnemyName)
      .subscribe((name) => {
        this.name = name;
      });

    this.actionPointsSubscription = this.store
      .select(selectEnemyActionPoints)
      .subscribe((actionPoints) => {
        this.actionPoints = actionPoints;
      });

    this.enemyEnergyPointsSubscription = this.store
      .select(selectEnemyEnergyPoints)
      .subscribe((energyPoints) => {
        this.energyPoints = energyPoints;
      });

    this.enemyHealthSubscription = this.store
      .select(selectEnemyHealth)
      .subscribe((state) => {
        this.health = state;
      });

    this.enemyMaxHealthSubscription = this.store
      .select(selectEnemyMaxHealth)
      .subscribe((state) => {
        this.maxHealth = state;
      });
  }

  ngOnDestroy(): void {
    this.enemyNameSubscription.unsubscribe();
    this.actionPointsSubscription.unsubscribe();
    this.enemyEnergyPointsSubscription.unsubscribe();
    this.enemyHealthSubscription.unsubscribe();
    this.enemyMaxHealthSubscription.unsubscribe();
  }
}
