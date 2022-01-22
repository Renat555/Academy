import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { showEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import {
  selectElement,
  selectForm,
} from 'src/app/store/selectors/duels/currentSpell.selectors';
import { selectSpellbook } from 'src/app/store/selectors/duels/spellbook.selectors';
import {
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

    let form = '';
    let element = '';
    let spellbook: any;

    this.store.select(selectSpellbook).subscribe((state) => {
      spellbook = state;
    });

    this.store.select(selectForm).subscribe((state) => {
      form = state;
      if (spellbook[element + form]) {
        this.russianNameSpell = spellbook[element + form][0];
      }
    });

    this.store.select(selectElement).subscribe((state) => {
      element = state;
      if (spellbook[element + form]) {
        this.russianNameSpell = spellbook[element + form][0];
      }
    });
  }

  showEffects() {
    this.store.dispatch(showEffects());
  }

  russianNameSpell = '';

  energyPoints = 0;
  actionPoints = 0;
}
