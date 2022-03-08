import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-anomaly',
  templateUrl: './anomaly.component.html',
  styleUrls: ['./anomaly.component.less'],
})
export class AnomalyComponent implements OnInit, OnChanges {
  constructor(private store: Store<AppState>) {}

  isExplosion = false;
  isIntact = true;
  isBroken = false;

  isAudioOn = true;

  @Input() health!: number;

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.health <= 0) {
      this.isExplosion = true;
      this.explosionSound();

      setTimeout(() => {
        this.isExplosion = false;
      }, 1700);

      setTimeout(() => {
        this.isIntact = false;
        this.isBroken = true;
      }, 500);
    } else {
      this.isBroken = false;
      this.isIntact = true;
    }
  }

  explosionSound() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/explosion.mp3');
    sound.play();
  }
}
