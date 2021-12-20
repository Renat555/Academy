import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-card-suits',
  templateUrl: './card-suits.component.html',
  styleUrls: ['./card-suits.component.less'],
})
export class CardSuitsComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });

    this.suitIndex = this.randomIndex();
  }

  randomIndex() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }

  isDiamond = false;
  isHeart = false;
  isClub = false;
  isSpade = false;

  isAudioOn = true;

  suitIndex = 0;

  rightAnswers = 0;
  wrongAnswers = 0;

  showCardSuitId: any;

  percentHint = 'Среднестатистический показатель \xa025%';

  showPicture(event: MouseEvent) {
    this.clickSound();

    clearTimeout(this.showCardSuitId);
    this.hidePictures();

    this.changeScale(event);

    if (this.suitIndex === 1) {
      this.isDiamond = true;
    } else if (this.suitIndex === 2) {
      this.isHeart = true;
    } else if (this.suitIndex === 3) {
      this.isClub = true;
    } else if (this.suitIndex === 4) {
      this.isSpade = true;
    }

    this.suitIndex = this.randomIndex();

    this.showCardSuitId = setTimeout(() => {
      this.hidePictures();
    }, 1000);
  }

  changeScale(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let card = (target as HTMLElement).dataset.card;

      if (
        (card === 'diamond' && this.suitIndex === 1) ||
        (card === 'heart' && this.suitIndex === 2) ||
        (card === 'club' && this.suitIndex === 3) ||
        (card === 'spade' && this.suitIndex === 4)
      ) {
        this.rightAnswers++;
      } else {
        this.wrongAnswers++;
      }
    }
  }

  hidePictures() {
    this.isDiamond = false;
    this.isHeart = false;
    this.isClub = false;
    this.isSpade = false;
  }

  goToMenu() {
    this.router.navigate(['intuition/menu']);
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
    let sound = new Audio('./../assets/audio/click.mp3');
    sound.play();
  }
}
