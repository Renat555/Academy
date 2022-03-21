import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { increaseUserHealth } from 'src/app/store/actions/arena/health.actions';
import { firstHealthPotionConsume } from 'src/app/store/actions/arena/toolbar.actions';
import {
  selectEnemyHealth,
  selectUserHealth,
} from 'src/app/store/selectors/arena/health.selector';
import { selectFirstPotion } from 'src/app/store/selectors/arena/toolbar.selectors';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-health-potion',
  templateUrl: './health-potion.component.html',
  styleUrls: ['./health-potion.component.less'],
})
export class HealthPotionComponent implements OnInit, AfterViewInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((soundState) => {
      this.isAudioOn = soundState;
    });

    this.store.select(selectFirstPotion).subscribe((state) => {
      if (state) {
        this.isFull = true;
        this.isEmpty = false;
      }
    });

    this.store.select(selectUserHealth).subscribe((health) => {
      this.userHealth = health;
    });

    this.store.select(selectEnemyHealth).subscribe((health) => {
      this.enemyHealth = health;
    });
  }

  ngAfterViewInit(): void {
    let keydown = fromEvent(document, 'keydown');

    let clicks = fromEvent(this.potion.nativeElement, 'click');

    clicks.subscribe(() => {
      if (this.isFull && this.userHealth > 0 && this.enemyHealth > 0) {
        this.consumePotion();
      }
    });

    keydown.subscribe((x) => {
      let key = (x as KeyboardEvent).key;

      if (
        key === '1' &&
        this.isFull &&
        this.userHealth > 0 &&
        this.enemyHealth > 0
      ) {
        this.consumePotion();
      }
    });
  }

  consumePotion() {
    this.store.dispatch(firstHealthPotionConsume());
    this.potionSound();
    this.store.dispatch(increaseUserHealth({ health: 30 }));
    this.isFull = false;
    this.isEmpty = true;
  }

  @ViewChild('potion') potion!: ElementRef;

  isFull = true;
  isEmpty = false;

  userHealth = 0;
  enemyHealth = 0;

  isAudioOn = true;

  potionSound() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/potion.mp3');
    sound.play();
  }
}
