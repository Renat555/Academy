import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEffectsWindowSwitch } from 'src/app/store/selectors/duels/effectsWindow.selector';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private wssService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.store.select(selectEffectsWindowSwitch).subscribe((state) => {
      this.isEffectsShow = state;
    });

    this.wssService.socket.subscribe((data) => {
      console.log(data);
    });
    this.wssService.sendMessage({
      user: {
        enemyType: 'human',
      },
    });
  }

  ngOnDestroy(): void {}

  isEffectsShow = false;
}
