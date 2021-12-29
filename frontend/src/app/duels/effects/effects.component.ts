import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { hideEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.less'],
})
export class EffectsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  userEffects = [];
  enemyEffects = [];

  hideEffects() {
    this.store.dispatch(hideEffects());
  }
}
