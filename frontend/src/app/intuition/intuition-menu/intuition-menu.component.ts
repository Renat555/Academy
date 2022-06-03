import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { soundToggle } from 'src/app/store/actions/sound.action';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-intuition-menu',
  templateUrl: './intuition-menu.component.html',
  styleUrls: ['./intuition-menu.component.less'],
})
export class IntuitionMenuComponent {
  constructor(
    private router: Router,
    private audioService: GeneralAudioService,
    private store: Store<AppState>
  ) {}

  goToFigures() {
    this.audioService.click();
    this.router.navigate(['intuition/figures']);
  }

  goToBlackWhite() {
    this.audioService.click();
    this.router.navigate(['intuition/blackWhite']);
  }

  goToHall() {
    this.audioService.click();
    this.router.navigate(['']);
  }

  goToColors() {
    this.audioService.click();
    this.router.navigate(['intuition/colors']);
  }

  goToPlayingCards() {
    this.audioService.click();
    this.router.navigate(['intuition/playingCards']);
  }

  goToCardSuits() {
    this.audioService.click();
    this.router.navigate(['intuition/cardSuits']);
  }

  goToUserDefinedRanged() {
    this.audioService.click();
    this.router.navigate(['intuition/userDefinedRanged']);
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }
}
