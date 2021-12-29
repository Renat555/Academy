import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEffectsWindowSwitch } from 'src/app/store/selectors/duels/effectsWindow.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectEffectsWindowSwitch).subscribe((state) => {
      this.isEffectsShow = state;
    });
  }

  isEffectsShow = false;
}
