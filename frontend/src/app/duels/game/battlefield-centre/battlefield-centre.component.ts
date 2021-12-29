import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { showEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-centre',
  templateUrl: './battlefield-centre.component.html',
  styleUrls: ['./battlefield-centre.component.less'],
})
export class BattlefieldCentreComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  showEffects() {
    this.store.dispatch(showEffects());
  }
}
