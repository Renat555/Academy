import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralAudioService } from '../services/audio/general-audio.service';
import { soundToggle } from '../store/actions/sound.action';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {
  constructor(
    private router: Router,
    private audioService: GeneralAudioService,
    private store: Store<AppState>
  ) {}

  goToIntuition() {
    this.audioService.click();
    this.router.navigate(['intuition/menu']);
  }

  goToArena() {
    this.audioService.click();
    this.router.navigate(['arena/game']);
  }

  goToDuels() {
    this.audioService.click();
    this.router.navigate(['duels/createHero']);
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }
}
