import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
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
export class BattlefieldCentreComponent implements OnInit, AfterViewInit {
  constructor(private store: Store<AppState>) {}

  @ViewChild('hint') hint!: ElementRef;
  @ViewChild('userSpell') userSpell!: ElementRef;

  russianNameSpell = '';
  spellDescription = '';

  energyPoints = 0;
  actionPoints = 0;
  needEnergyPoints = 0;
  needActionPoints = 0;

  isHintHidden = true;
  hintLeft = '';
  hintTop = '';
  hintWidth = '';

  ngAfterViewInit(): void {
    let userSpell = this.userSpell.nativeElement;

    let mouseEnter = fromEvent(userSpell, 'mouseenter');

    let mouseLeave = fromEvent(userSpell, 'mouseleave');

    mouseEnter.subscribe((event) => {
      let spellCoord = userSpell.getBoundingClientRect();

      this.hintWidth = spellCoord.width + 'px';
      this.hintTop = spellCoord.bottom + 10 + window.pageYOffset + 'px';
      this.hintLeft = spellCoord.left + 'px';
      this.isHintHidden = false;
    });

    mouseLeave.subscribe((event) => {
      this.isHintHidden = true;
    });
  }

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
        this.needActionPoints = spellbook[element + form][1];
        this.needEnergyPoints = spellbook[element + form][2];
        this.spellDescription = spellbook[element + form][3];
      }
    });

    this.store.select(selectElement).subscribe((state) => {
      element = state;
      if (spellbook[element + form]) {
        this.russianNameSpell = spellbook[element + form][0];
        this.needActionPoints = spellbook[element + form][1];
        this.needEnergyPoints = spellbook[element + form][2];
        this.spellDescription = spellbook[element + form][3];
      }
    });
  }

  showEffects() {
    this.store.dispatch(showEffects());
  }
}
