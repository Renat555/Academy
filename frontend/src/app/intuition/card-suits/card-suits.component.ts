import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { HttpService } from 'src/app/services/http.service';
import { soundToggle } from 'src/app/store/actions/sound.action';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-card-suits',
  templateUrl: './card-suits.component.html',
  styleUrls: ['./card-suits.component.less'],
})
export class CardSuitsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService,
    private audioService: GeneralAudioService
  ) {}

  ngOnInit(): void {
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
    this.audioService.click();

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
    this.audioService.click();
    this.router.navigate(['intuition/menu']);
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }

  ngOnDestroy(): void {
    let login = localStorage.getItem('login') || '';

    this.httpService
      .postIntuitionResult({
        mode: 'card-suits',
        login: login,
        right: this.rightAnswers,
        wrong: this.wrongAnswers,
      })
      .subscribe(() => {});
  }
}
