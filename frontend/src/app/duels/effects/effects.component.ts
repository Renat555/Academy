import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { hideEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import { SpellbookState } from 'src/app/store/reducers/duels/spellBook.reducer';
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
export class EffectsComponent implements OnInit {
  constructor(private store: Store<AppState>, private render: Renderer2) {}

  @ViewChild('hint') hint!: ElementRef;

  ngOnInit(): void {
    this.store.select(selectSpellbook).subscribe((state) => {
      this.spellBook = state;
    });

    this.store.select(selectUserEffects).subscribe((effects) => {
      for (let i = 0; i < effects.length; i++) {
        this.userEffects[i] = {
          name: effects[i]['name'],
          russianName: this.spellBook[effects[i]['name']][0],
          duration: effects[i]['duration'],
        };
      }
    });

    this.store.select(selectEnemyEffects).subscribe((effects) => {
      for (let i = 0; i < effects.length; i++) {
        this.enemyEffects[i] = {
          name: effects[i]['name'],
          russianName: this.spellBook[effects[i]['name']][0],
          duration: effects[i]['duration'],
        };
      }
    });
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
      this.spellBook[spellName!][3] + ' Осталось ходов ' + spellDuration;

    this.render.setStyle(divHint, 'top', divEffect.offsetTop + 70 + 'px');
    this.render.setStyle(divHint, 'left', coordEffect.left - 310 + 'px');
  }

  hideHint() {
    this.isHintHidden = true;
  }

  hintText = '';
  isHintHidden = true;

  spellBook: SpellbookState = {};

  userEffects: { name: string; russianName: string; duration: number }[] = [];
  enemyEffects: { name: string; russianName: string; duration: number }[] = [];

  hideEffects() {
    this.store.dispatch(hideEffects());
  }
}
