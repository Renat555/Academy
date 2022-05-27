import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { soundOff, soundOn } from '../store/actions/sound.action';
import { selectSoundSwitch } from '../store/selectors/sound.selector';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<AppState>) {}

  soundSwitchSubscription = new Subscription();

  ngOnInit() {
    this.soundSwitchSubscription = this.store
      .select(selectSoundSwitch)
      .subscribe((state) => {
        this.isAudioOn = state;
      });
  }

  isAudioOn: boolean = true;

  goToIntuition() {
    this.clickSound();
    this.router.navigate(['intuition/menu']);
  }

  goToArena() {
    this.clickSound();
    this.router.navigate(['arena/game']);
  }

  goToDuels() {
    this.clickSound();
    this.router.navigate(['duels/createHero']);
  }

  clickSound() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/click.mp3');
    sound.play();
  }

  toggleSound() {
    if (this.isAudioOn) {
      this.store.dispatch(soundOff());
    } else {
      this.store.dispatch(soundOn());
    }
  }

  ngOnDestroy(): void {
    this.soundSwitchSubscription.unsubscribe();
  }
}
