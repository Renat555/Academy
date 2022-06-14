import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class DuelsAudioService {
  constructor(private store: Store<AppState>) {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  isAudioOn = true;

  fire() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/fire1.mp3');
    sound.play();
  }

  water() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/water.mp3');
    sound.play();
  }

  earth() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/earth.mp3');
    sound.play();
  }

  air() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/air.mp3');
    sound.play();
  }

  life() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/life.mp3');
    sound.play();
  }

  death() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/death.mp3');
    sound.play();
  }
}
