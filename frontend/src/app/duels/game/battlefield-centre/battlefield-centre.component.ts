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
import { SpellbookState } from 'src/app/store/reducers/duels/spellBook.reducer';
import {
  selectDespell,
  selectElement,
  selectForm,
} from 'src/app/store/selectors/duels/currentSpell.selectors';
import { selectMuve } from 'src/app/store/selectors/duels/generalInfo.selectors';
import { selectSpellbook } from 'src/app/store/selectors/duels/spellbook.selectors';
import {
  selectUserActionPoints,
  selectUserEnergyPoints,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-battlefield-centre',
  templateUrl: './battlefield-centre.component.html',
  styleUrls: ['./battlefield-centre.component.less'],
})
export class BattlefieldCentreComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<AppState>,
    private wssService: WebsocketService
  ) {}

  @ViewChild('hint') hint!: ElementRef;
  @ViewChild('userSpell') userSpell!: ElementRef;

  spellBook: SpellbookState = {};
  currentSpellForm = '';
  currentSpellElement = '';
  russianNameSpell = '';
  spellDescription = '';
  despell = '';

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
    this.store.select(selectUserEnergyPoints).subscribe((userEnergyPoints) => {
      this.energyPoints = userEnergyPoints;
    });

    this.store.select(selectUserActionPoints).subscribe((userActionPoints) => {
      this.actionPoints = userActionPoints;
    });

    this.store.select(selectSpellbook).subscribe((state) => {
      this.spellBook = state;
    });

    this.store.select(selectForm).subscribe((state) => {
      this.currentSpellForm = state;
      this.createSpell();
    });

    this.store.select(selectElement).subscribe((state) => {
      this.currentSpellElement = state;
      this.createSpell();
    });

    this.store.select(selectDespell).subscribe((state) => {
      this.despell = state;
    });
  }

  createSpell() {
    if (this.spellBook[this.currentSpellElement + this.currentSpellForm]) {
      this.russianNameSpell =
        this.spellBook[this.currentSpellElement + this.currentSpellForm][
          'russianName'
        ];
      this.needActionPoints =
        this.spellBook[this.currentSpellElement + this.currentSpellForm][
          'actionPoints'
        ];
      this.needEnergyPoints =
        this.spellBook[this.currentSpellElement + this.currentSpellForm][
          'energyPoints'
        ];
      this.spellDescription =
        this.spellBook[this.currentSpellElement + this.currentSpellForm][
          'description'
        ];
    }
  }

  showEffects() {
    this.store.dispatch(showEffects());
  }

  activationSpell() {
    if (!this.currentSpellElement && !this.currentSpellForm) return;

    if (
      this.needEnergyPoints > this.energyPoints ||
      this.needActionPoints > this.actionPoints
    )
      return;

    let spell = this.currentSpellElement + this.currentSpellForm;

    switch (spell) {
      case 'firespear':
      case 'firestamp':
      case 'fireflow':
      case 'waterspear':
      case 'waterflow':
      case 'earthspear':
      case 'earthflow':
      case 'airspear':
      case 'airflow':
      case 'lifecrown':
      case 'lifesource':
      case 'deathcrown':
      case 'deathsource':
        this.sendSpell(spell);
        break;
      case 'fireshild':
      case 'firecrown':
      case 'firesource':
      case 'firesphere':
      case 'firepower':
      case 'watershild':
      case 'watercrown':
      case 'watersphere':
      case 'waterstamp':
      case 'waterpower':
      case 'earthshild':
      case 'earthcrown':
      case 'earthsource':
      case 'earthsphere':
      case 'earthstamp':
      case 'earthpower':
      case 'airshild':
      case 'aircrown':
      case 'airsource':
      case 'airsphere':
      case 'airstamp':
      case 'airpower':
      case 'lifeshild':
      case 'lifesphere':
      case 'lifestamp':
      case 'lifeflow':
      case 'lifepower':
      case 'deathshild':
      case 'deathsphere':
      case 'deathstamp':
      case 'deathkey':
      case 'deathflow':
        this.sendEffect(spell);
        break;
      case 'watersource':
      case 'waterkey':
      case 'earthkey':
      case 'lifespear':
      case 'lifekey':
      case 'firekey':
      case 'airkey':
      case 'deathspear':
      case 'deathpower':
        this.sendDespell(spell);
        break;
    }
  }

  sendSpell(spellName: string) {
    let gameInformation = { header: 'spell', spell: spellName };
    this.wssService.sendMessage(gameInformation);
  }

  sendEffect(effectName: string) {
    let gameInformation = { header: 'effect', spell: effectName };
    this.wssService.sendMessage(gameInformation);
  }

  sendDespell(spellName: string) {
    if (this.despell === '') return;

    let gameInformation = {
      header: 'despell',
      spell: spellName,
      despell: this.despell,
    };
    this.wssService.sendMessage(gameInformation);
  }

  isUserMove() {
    let gameMove;
    this.store.select(selectMuve).subscribe((move) => {
      gameMove = move;
    });
    if (gameMove === 'user') return true;
    return false;
  }

  endMove() {
    if (!this.isUserMove()) return;

    let gameInformation = { header: 'endMove' };
    this.wssService.sendMessage(gameInformation);
  }
}
