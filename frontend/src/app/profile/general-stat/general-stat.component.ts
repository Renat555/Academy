import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { getResults } from 'src/app/store/actions/intuition/results.actions';
import { soundToggle } from 'src/app/store/actions/sound.action';
import {
  selectBlackWhite,
  selectCardSuits,
  selectColors,
  selectFigures,
  selectPlayingCards,
} from 'src/app/store/selectors/intuition/results.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-general-stat',
  templateUrl: './general-stat.component.html',
  styleUrls: ['./general-stat.component.less'],
})
export class GeneralStatComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private audioService: GeneralAudioService
  ) {}

  figuresSubscription = new Subscription();
  cardSuitsSubscription = new Subscription();
  colorsSubscription = new Subscription();
  blackWhiteSubscription = new Subscription();
  playingCardsSubscription = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(getResults());

    this.figuresStat();
    this.cardSuitsStat();
    this.colorsStat();
    this.blackWhiteStat();
    this.playingCardsStat();
  }

  figuresStat() {
    this.figuresSubscription = this.store
      .select(selectFigures)
      .subscribe((figures) => {
        this.figuresRight = 0;
        this.figuresWrong = 0;
        this.figuresPercent = '';

        for (let i = 0; i < figures.length; i++) {
          this.figuresRight += figures[i]['correct'];
          this.figuresWrong += figures[i]['wrong'];
        }

        let figuresAnswers = this.figuresRight + this.figuresWrong;

        if (figuresAnswers !== 0) {
          let figuresPercentRight =
            (this.figuresRight * 100) / (this.figuresRight + this.figuresWrong);

          this.figuresPercent = figuresPercentRight.toFixed(1);
        } else {
          this.figuresPercent = '0.0';
        }
      });
  }

  cardSuitsStat() {
    this.cardSuitsSubscription = this.store
      .select(selectCardSuits)
      .subscribe((cardSuits) => {
        this.cardSuitsRight = 0;
        this.cardSuitsWrong = 0;
        this.cardSuitsPercent = '';

        for (let i = 0; i < cardSuits.length; i++) {
          this.cardSuitsRight += cardSuits[i]['correct'];
          this.cardSuitsWrong += cardSuits[i]['wrong'];
        }

        let cardSuitsAnswers = this.cardSuitsRight + this.cardSuitsWrong;

        if (cardSuitsAnswers !== 0) {
          let cardSuitsPercentRight =
            (this.cardSuitsRight * 100) /
            (this.cardSuitsRight + this.cardSuitsWrong);

          this.cardSuitsPercent = cardSuitsPercentRight.toFixed(1);
        } else {
          this.cardSuitsPercent = '0.0';
        }
      });
  }

  colorsStat() {
    this.colorsSubscription = this.store
      .select(selectColors)
      .subscribe((colors) => {
        this.colorsRight = 0;
        this.colorsWrong = 0;
        this.colorsPercent = '';

        for (let i = 0; i < colors.length; i++) {
          this.colorsRight += colors[i]['correct'];
          this.colorsWrong += colors[i]['wrong'];
        }

        let colorsAnswers = this.colorsRight + this.colorsWrong;

        if (colorsAnswers !== 0) {
          let colorsPercentRight =
            (this.colorsRight * 100) / (this.colorsRight + this.colorsWrong);

          this.colorsPercent = colorsPercentRight.toFixed(1);
        } else {
          this.colorsPercent = '0.0';
        }
      });
  }

  blackWhiteStat() {
    this.blackWhiteSubscription = this.store
      .select(selectBlackWhite)
      .subscribe((blackWhite) => {
        this.blackWhiteRight = 0;
        this.blackWhiteWrong = 0;
        this.blackWhitePercent = '';

        for (let i = 0; i < blackWhite.length; i++) {
          this.blackWhiteRight += blackWhite[i]['correct'];
          this.blackWhiteWrong += blackWhite[i]['wrong'];
        }

        let blackWhiteAnswers = this.blackWhiteRight + this.blackWhiteWrong;

        if (blackWhiteAnswers !== 0) {
          let blackWhitePercentRight =
            (this.blackWhiteRight * 100) /
            (this.blackWhiteRight + this.blackWhiteWrong);

          this.blackWhitePercent = blackWhitePercentRight.toFixed(1);
        } else {
          this.blackWhitePercent = '0.0';
        }
      });
  }

  playingCardsStat() {
    this.playingCardsSubscription = this.store
      .select(selectPlayingCards)
      .subscribe((playingCards) => {
        this.playingCardsRight = 0;
        this.playingCardsWrong = 0;
        this.playingCardsPercent = '';

        for (let i = 0; i < playingCards.length; i++) {
          this.playingCardsRight += playingCards[i]['correct'];
          this.playingCardsWrong += playingCards[i]['wrong'];
        }

        let playingCardsAnswers =
          this.playingCardsRight + this.playingCardsWrong;

        if (playingCardsAnswers !== 0) {
          let playingCardsPercentRight =
            (this.playingCardsRight * 100) /
            (this.playingCardsRight + this.playingCardsWrong);

          this.playingCardsPercent = playingCardsPercentRight.toFixed(1);
        } else {
          this.playingCardsPercent = '0.0';
        }
      });
  }

  figuresRight = 0;
  figuresWrong = 0;
  figuresPercent = '';

  cardSuitsRight = 0;
  cardSuitsWrong = 0;
  cardSuitsPercent = '';

  colorsRight = 0;
  colorsWrong = 0;
  colorsPercent = '';

  blackWhiteRight = 0;
  blackWhiteWrong = 0;
  blackWhitePercent = '';

  playingCardsRight = 0;
  playingCardsWrong = 0;
  playingCardsPercent = '';

  isAudioOn = false;

  goToDetail(mode: string) {
    this.router.navigate(['profile/detailStat'], {
      queryParams: { mode: mode },
    });
  }

  goToMenu() {
    this.audioService.click();
    this.router.navigate(['/menu']);
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }

  ngOnDestroy(): void {
    this.figuresSubscription.unsubscribe();
    this.cardSuitsSubscription.unsubscribe();
    this.colorsSubscription.unsubscribe();
    this.blackWhiteSubscription.unsubscribe();
    this.playingCardsSubscription.unsubscribe();
  }
}
