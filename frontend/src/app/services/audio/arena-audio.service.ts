import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class ArenaAudioService {
  constructor(private store: Store<AppState>) {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  isAudioOn = true;

  explosion() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/explosion.mp3');
    sound.play();
  }

  discharge() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/discharge.mp3');
    sound.play();
  }

  fire() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/fire.mp3');
    sound.play();
  }

  step() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/step.mp3');
    sound.play();
  }

  drinkPotion() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/potion.mp3');
    sound.play();
  }
}
