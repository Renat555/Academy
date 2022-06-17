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

  spellSound(spell: string) {
    switch (spell) {
      case 'firespear':
      case 'fireshield':
      case 'firecrown':
      case 'firesource':
      case 'firesphere':
      case 'firestamp':
      case 'firekey':
      case 'fireflow':
      case 'firepower':
        this.fire();
        break;
      case 'waterspear':
      case 'watershield':
      case 'watercrown':
      case 'watersource':
      case 'watersphere':
      case 'waterstamp':
      case 'waterkey':
      case 'waterflow':
      case 'waterpower':
        this.water();
        break;
      case 'earthspear':
      case 'earthshield':
      case 'earthcrown':
      case 'earthsource':
      case 'earthsphere':
      case 'earthstamp':
      case 'earthkey':
      case 'earthflow':
      case 'earthpower':
        this.earth();
        break;
      case 'airspear':
      case 'airshield':
      case 'aircrown':
      case 'airsource':
      case 'airsphere':
      case 'airstamp':
      case 'airkey':
      case 'airflow':
      case 'airpower':
        this.air();
        break;
      case 'lifespear':
      case 'lifeshield':
      case 'lifecrown':
      case 'lifesource':
      case 'lifesphere':
      case 'lifestamp':
      case 'lifekey':
      case 'lifeflow':
      case 'lifepower':
        this.life();
        break;
      case 'deathspear':
      case 'deathshield':
      case 'deathcrown':
      case 'deathsource':
      case 'deathsphere':
      case 'deathstamp':
      case 'deathkey':
      case 'deathflow':
      case 'deathpower':
        this.death();
        break;
    }
  }

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
