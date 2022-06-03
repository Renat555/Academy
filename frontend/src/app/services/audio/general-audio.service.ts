import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSoundSwitch } from '../../store/selectors/sound.selector';
import { AppState } from '../../store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class GeneralAudioService {
  constructor(private store: Store<AppState>) {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  isAudioOn = true;

  click() {
    if (!this.isAudioOn) return;
    let sound = new Audio('../../assets/audio/click.mp3');
    sound.play();
  }
}
