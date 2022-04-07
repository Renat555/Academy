import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEffectsWindowSwitch } from 'src/app/store/selectors/duels/effectsWindow.selector';
import {
  selectEnemyHealth,
  selectUserHealth,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select(selectEffectsWindowSwitch).subscribe((state) => {
      this.isEffectsShow = state;
    });

    this.store.select(selectUserHealth).subscribe((state) => {
      if (state <= 0) {
        this.textForEndGame = 'Вы проиграли.';
        this.isEndGameMessageShown = true;
      }
    });
    this.store.select(selectEnemyHealth).subscribe((state) => {
      if (state <= 0) {
        this.textForEndGame = 'Вы победили.';
        this.isEndGameMessageShown = true;
      }
    });
  }

  ngOnDestroy(): void {}

  isEffectsShow = false;
  isEndGameMessageShown = false;

  textForEndGame = '';

  closeEndGameMessage() {
    this.isEndGameMessageShown = false;
    this.router.navigate(['/']);
  }
}
