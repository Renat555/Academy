import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-intuition-menu',
  templateUrl: './intuition-menu.component.html',
  styleUrls: ['./intuition-menu.component.less'],
})
export class IntuitionMenuComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  isAudioOn: boolean = true;

  goToFigures() {
    this.clickSound();
    this.router.navigate(['intuition/figures']);
  }

  goToBlackWhite() {
    this.clickSound();
    this.router.navigate(['intuition/blackWhite']);
  }

  goToHall() {
    this.router.navigate(['']);
  }

  goToColors() {
    this.clickSound();
    this.router.navigate(['intuition/colors']);
  }

  goToPlayingCards() {
    this.clickSound();
    this.router.navigate(['intuition/playingCards']);
  }

  goToCardSuits() {
    this.clickSound();
    this.router.navigate(['intuition/cardSuits']);
  }

  toggleSound() {
    if (this.isAudioOn) {
      this.store.dispatch(soundOff());
    } else {
      this.store.dispatch(soundOn());
    }
  }

  clickSound() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./assets/audio/click.mp3');
    sound.play();
  }
}
