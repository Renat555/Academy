import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ArenaAudioService } from 'src/app/services/audio/arena-audio.service';
import { increaseUserHealth } from 'src/app/store/actions/arena/health.actions';
import { firstHealthPotionConsume } from 'src/app/store/actions/arena/toolbar.actions';
import {
  selectEnemyHealth,
  selectUserHealth,
} from 'src/app/store/selectors/arena/health.selector';
import { selectFirstPotion } from 'src/app/store/selectors/arena/toolbar.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-health-potion',
  templateUrl: './health-potion.component.html',
  styleUrls: ['./health-potion.component.less'],
})
export class HealthPotionComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private arenaAudio: ArenaAudioService
  ) {}

  firstPotionSubscription = new Subscription();
  userHealthSubscription = new Subscription();
  enemyHealthSubscription = new Subscription();

  @HostListener('document:keydown.1')
  keydown() {
    if (this.isFull && this.userHealth > 0 && this.enemyHealth > 0) {
      this.consumePotion();
    }
  }

  @HostListener('click')
  onClick() {
    if (this.isFull && this.userHealth > 0 && this.enemyHealth > 0) {
      this.consumePotion();
    }
  }

  ngOnInit(): void {
    this.firstPotionSubscription = this.store
      .select(selectFirstPotion)
      .subscribe((state) => {
        if (state) {
          this.isFull = true;
          this.isEmpty = false;
        }
      });

    this.userHealthSubscription = this.store
      .select(selectUserHealth)
      .subscribe((health) => {
        this.userHealth = health;
      });

    this.enemyHealthSubscription = this.store
      .select(selectEnemyHealth)
      .subscribe((health) => {
        this.enemyHealth = health;
      });
  }

  consumePotion() {
    this.store.dispatch(firstHealthPotionConsume());
    this.arenaAudio.drinkPotion();
    this.store.dispatch(increaseUserHealth({ health: 100 }));
    this.isFull = false;
    this.isEmpty = true;
  }

  @ViewChild('potion') potion!: ElementRef;

  isFull = true;
  isEmpty = false;

  userHealth = 0;
  enemyHealth = 0;

  ngOnDestroy(): void {
    this.firstPotionSubscription.unsubscribe();
    this.userHealthSubscription.unsubscribe();
    this.enemyHealthSubscription.unsubscribe();
  }
}
