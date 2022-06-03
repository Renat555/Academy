import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ArenaAudioService } from 'src/app/services/audio/arena-audio.service';
import { increaseUserHealth } from 'src/app/store/actions/arena/health.actions';
import { selectFirstPotion } from 'src/app/store/selectors/arena/toolbar.selectors';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-arena-hero',
  templateUrl: './arena-hero.component.html',
  styleUrls: ['./arena-hero.component.less'],
  animations: [
    trigger('steps', [
      state(
        'backOne',
        style({ backgroundImage: 'url(../../assets/arena/hero/c1.png)' })
      ),
      state(
        'backTwo',
        style({ backgroundImage: 'url(../../assets/arena/hero/c2.png)' })
      ),
      state(
        'faceOne',
        style({ backgroundImage: 'url(../../assets/arena/hero/c3.png)' })
      ),
      state(
        'faceTwo',
        style({ backgroundImage: 'url(../../assets/arena/hero/c4.png)' })
      ),
      state(
        'leftOne',
        style({ backgroundImage: 'url(../../assets/arena/hero/c5.png)' })
      ),
      state(
        'leftTwo',
        style({ backgroundImage: 'url(../../assets/arena/hero/c6.png)' })
      ),
      state(
        'rightOne',
        style({ backgroundImage: 'url(../../assets/arena/hero/c7.png)' })
      ),
      state(
        'rightTwo',
        style({ backgroundImage: 'url(../../assets/arena/hero/c8.png)' })
      ),
    ]),
  ],
})
export class ArenaHeroComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private arenaAudio: ArenaAudioService
  ) {}

  isAudioOn = true;

  isDischarge = false;
  isSparks = false;

  @Input() stateSteps!: string;
  @Input() discharge!: boolean;

  firstPotionSubscription = new Subscription();

  ngOnInit(): void {
    this.firstPotionSubscription = this.store
      .select(selectFirstPotion)
      .subscribe((potionState) => {
        if (!potionState) {
          this.isSparks = true;

          setTimeout(() => {
            this.isSparks = false;
          }, 1000);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stateSteps) {
      this.arenaAudio.step();
    }

    if (changes.discharge && this.discharge) {
      this.arenaAudio.discharge();
      this.isDischarge = true;
      setTimeout(() => {
        this.isDischarge = false;
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.firstPotionSubscription.unsubscribe();
  }
}
