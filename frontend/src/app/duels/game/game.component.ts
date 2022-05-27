import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectEffectsWindowSwitch } from 'src/app/store/selectors/duels/effectsWindow.selector';
import {
  selectEnemyHealth,
  selectUserHealth,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private router: Router) {}

  isEffectsShow = false;
  isEndGameMessageShown = false;

  textForEndGame = '';

  effectsWindowSwitchSubscription = new Subscription();
  userHealthSubscription = new Subscription();
  enemyHealthSubscription = new Subscription();

  ngOnInit(): void {
    this.effectsWindowSwitchSubscription = this.store
      .select(selectEffectsWindowSwitch)
      .subscribe((state) => {
        this.isEffectsShow = state;
      });

    this.userHealthSubscription = this.store
      .select(selectUserHealth)
      .subscribe((state) => {
        if (state <= 0) {
          this.textForEndGame = 'Вы проиграли.';
          this.isEndGameMessageShown = true;
        }
      });
    this.enemyHealthSubscription = this.store
      .select(selectEnemyHealth)
      .subscribe((state) => {
        if (state <= 0) {
          this.textForEndGame = 'Вы победили.';
          this.isEndGameMessageShown = true;
        }
      });
  }

  closeEndGameMessage() {
    this.isEndGameMessageShown = false;
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.effectsWindowSwitchSubscription.unsubscribe();
    this.userHealthSubscription.unsubscribe();
    this.enemyHealthSubscription.unsubscribe();
  }
}
