import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  addDespell,
  deleteDespell,
} from 'src/app/store/actions/duels/currentSpell.actions';
import { hideEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import { SpellbookState } from 'src/app/store/reducers/duels/spellBook.reducer';
import { selectSpell } from 'src/app/store/selectors/duels/currentSpell.selectors';
import { selectSpellbook } from 'src/app/store/selectors/duels/spellbook.selectors';
import {
  selectEnemyEffects,
  selectUserEffects,
} from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.less'],
})
export class EffectsComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private render: Renderer2) {}

  @ViewChild('hint') hint!: ElementRef;

  hintText = '';
  isHintHidden = true;

  spellBook: SpellbookState = {};

  currentSpell = '';

  userEffects: { name: string; russianName: string; duration: number }[] = [];
  enemyEffects: { name: string; russianName: string; duration: number }[] = [];

  spellBookSubscription = new Subscription();
  currentSpellSubscription = new Subscription();
  userEffectsSubscription = new Subscription();
  enemyEffectsSubscription = new Subscription();

  ngOnInit(): void {
    this.spellBookSubscription = this.store
      .select(selectSpellbook)
      .subscribe((state) => {
        this.spellBook = state;
      });

    this.currentSpellSubscription = this.store
      .select(selectSpell)
      .subscribe((state) => {
        this.currentSpell = state;
      });

    this.userEffectsSubscription = this.store
      .select(selectUserEffects)
      .subscribe((effects) => {
        for (let i = 0; i < effects.length; i++) {
          this.userEffects[i] = {
            name: effects[i]['name'],
            russianName: this.spellBook[effects[i]['name']]['russianName'],
            duration: effects[i]['duration'],
          };
        }
      });

    this.enemyEffectsSubscription = this.store
      .select(selectEnemyEffects)
      .subscribe((effects) => {
        for (let i = 0; i < effects.length; i++) {
          this.enemyEffects[i] = {
            name: effects[i]['name'],
            russianName: this.spellBook[effects[i]['name']]['russianName'],
            duration: effects[i]['duration'],
          };
        }
      });
  }

  selectEffect(event: MouseEvent, player: string) {
    let target = event.target as HTMLElement;
    let effect = target.dataset.spell;
    if (!effect) return;

    let dependenciens = this.spellBook[this.currentSpell]['dependenciens'];

    if (player === 'user') {
      if (
        this.currentSpell !== 'watersource' &&
        this.currentSpell !== 'waterkey' &&
        this.currentSpell !== 'earthkey' &&
        this.currentSpell !== 'lifespear' &&
        this.currentSpell !== 'lifekey'
      ) {
        return;
      }

      for (let i = 0; i < dependenciens.length; i++) {
        if (effect === dependenciens[i]) {
          this.clearSelectedEffects();
          target.classList.add('selected');
          this.store.dispatch(addDespell({ despell: effect }));
        }
      }
    } else if (player === 'enemy') {
      if (
        this.currentSpell !== 'firekey' &&
        this.currentSpell !== 'airkey' &&
        this.currentSpell !== 'deathspear' &&
        this.currentSpell !== 'deathpower'
      ) {
        return;
      }

      for (let i = 0; i < dependenciens.length; i++) {
        if (effect === dependenciens[i]) {
          this.clearSelectedEffects();
          console.log(effect, 'selected');
          target.classList.add('selected');
          this.store.dispatch(addDespell({ despell: effect }));
        }
      }
    }
  }

  clearSelectedEffects() {
    this.store.dispatch(deleteDespell());

    let userEffects = document.querySelectorAll('#userEffect');

    for (let i = 0; i < userEffects.length; i++) {
      userEffects[i].classList.remove('selected');
    }

    let enemyEffects = document.querySelectorAll('#enemyEffect');

    for (let i = 0; i < enemyEffects.length; i++) {
      enemyEffects[i].classList.remove('selected');
    }
  }

  showHint(event: MouseEvent) {
    this.isHintHidden = false;

    setTimeout(() => {
      this.setHint(event);
    }, 0);
  }

  setHint(event: MouseEvent) {
    let divHint = this.hint.nativeElement;
    let hintCoord = divHint.getBoundingClientRect();

    let divEffect = event.target as HTMLInputElement;
    let coordEffect = divEffect.getBoundingClientRect();

    let spellName = divEffect.dataset.spell;
    let spellDuration = divEffect.dataset.duration;

    this.hintText =
      this.spellBook[spellName!]['description'] +
      ' ???????????????? ?????????? ' +
      spellDuration;

    this.render.setStyle(divHint, 'top', divEffect.offsetTop + 70 + 'px');
    this.render.setStyle(divHint, 'left', coordEffect.left - 310 + 'px');
  }

  hideHint() {
    this.isHintHidden = true;
  }

  hideEffects() {
    this.store.dispatch(hideEffects());
  }

  ngOnDestroy(): void {
    this.spellBookSubscription.unsubscribe();
    this.currentSpellSubscription.unsubscribe();
    this.userEffectsSubscription.unsubscribe();
    this.enemyEffectsSubscription.unsubscribe();
  }
}
