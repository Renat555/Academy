import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArenaAudioService } from 'src/app/services/audio/arena-audio.service';

@Component({
  selector: 'app-anomaly',
  templateUrl: './anomaly.component.html',
  styleUrls: ['./anomaly.component.less'],
})
export class AnomalyComponent implements OnChanges {
  constructor(private arenaAudio: ArenaAudioService) {}

  isExplosion = false;
  isIntact = true;
  isBroken = false;

  isAudioOn = true;

  @Input() health!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.health <= 0) {
      this.isExplosion = true;
      this.arenaAudio.explosion();

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
}
