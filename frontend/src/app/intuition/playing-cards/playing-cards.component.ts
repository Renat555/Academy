import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from '../../store/state/app.state';

@Component({
  selector: 'app-playing-cards',
  templateUrl: './playing-cards.component.html',
  styleUrls: ['./playing-cards.component.less'],
})
export class PlayingCardsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {}

  soundSwitchSubscription = new Subscription();

  ngOnInit() {
    this.soundSwitchSubscription = this.store
      .select(selectSoundSwitch)
      .subscribe((state) => {
        this.isAudioOn = state;
      });

    this.cardIndex = this.randomIndex();
  }

  ngOnDestroy(): void {
    let login = localStorage.getItem('login') || '';

    this.httpService
      .postIntuitionResult({
        mode: 'playing-cards',
        login: login,
        right: this.rightAnswers,
        wrong: this.wrongAnswers,
      })
      .subscribe(() => {});

    this.soundSwitchSubscription.unsubscribe();
  }

  randomIndex() {
    return Math.floor(Math.random() * (53 - 1) + 1);
  }

  isCardBack = true;
  isTwoOfClubs = false;
  isTwoOfDiamonds = false;
  isTwoOfHearts = false;
  isTwoOfSpades = false;
  isThreeOfClubs = false;
  isThreeOfDiamonds = false;
  isThreeOfHearts = false;
  isThreeOfSpades = false;
  isFourOfClubs = false;
  isFourOfDiamonds = false;
  isFourOfHearts = false;
  isFourOfSpades = false;
  isFiveOfClubs = false;
  isFiveOfDiamonds = false;
  isFiveOfHearts = false;
  isFiveOfSpades = false;
  isSixOfClubs = false;
  isSixOfDiamonds = false;
  isSixOfHearts = false;
  isSixOfSpades = false;
  isSevenOfClubs = false;
  isSevenOfDiamonds = false;
  isSevenOfHearts = false;
  isSevenOfSpades = false;
  isEightOfClubs = false;
  isEightOfDiamonds = false;
  isEightOfHearts = false;
  isEightOfSpades = false;
  isNineOfClubs = false;
  isNineOfDiamonds = false;
  isNineOfHearts = false;
  isNineOfSpades = false;
  isTenOfClubs = false;
  isTenOfDiamonds = false;
  isTenOfHearts = false;
  isTenOfSpades = false;
  isJackOfClubs = false;
  isJackOfDiamonds = false;
  isJackOfHearts = false;
  isJackOfSpades = false;
  isQueenOfClubs = false;
  isQueenOfDiamonds = false;
  isQueenOfHearts = false;
  isQueenOfSpades = false;
  isKingOfClubs = false;
  isKingOfDiamonds = false;
  isKingOfHearts = false;
  isKingOfSpades = false;
  isAceOfClubs = false;
  isAceOfDiamonds = false;
  isAceOfHearts = false;
  isAceOfSpades = false;

  isAudioOn: boolean = true;

  cardIndex: number = 0;

  showCardId: any;

  rightAnswers = 0;
  wrongAnswers = 0;

  percentHint = 'Среднестатистический показатель \xa01.9%';

  changeScale(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let card = (target as HTMLElement).dataset.card;

      if (
        (card === 'twoOfClubs' && this.cardIndex === 1) ||
        (card === 'twoOfDiamonds' && this.cardIndex === 2) ||
        (card === 'twoOfHearts' && this.cardIndex === 3) ||
        (card === 'twoOfSpades' && this.cardIndex === 4) ||
        (card === 'threeOfClubs' && this.cardIndex === 5) ||
        (card === 'threeOfDiamonds' && this.cardIndex === 6) ||
        (card === 'threeOfHearts' && this.cardIndex === 7) ||
        (card === 'threeOfSpades' && this.cardIndex === 8) ||
        (card === 'fourOfClubs' && this.cardIndex === 9) ||
        (card === 'fourOfDiamonds' && this.cardIndex === 10) ||
        (card === 'fourOfHearts' && this.cardIndex === 11) ||
        (card === 'fourOfSpades' && this.cardIndex === 12) ||
        (card === 'fiveOfClubs' && this.cardIndex === 13) ||
        (card === 'fiveOfDiamonds' && this.cardIndex === 14) ||
        (card === 'fiveOfHearts' && this.cardIndex === 15) ||
        (card === 'fiveOfSpades' && this.cardIndex === 16) ||
        (card === 'sixOfClubs' && this.cardIndex === 17) ||
        (card === 'sixOfDiamonds' && this.cardIndex === 18) ||
        (card === 'sixOfHearts' && this.cardIndex === 19) ||
        (card === 'sixOfSpades' && this.cardIndex === 20) ||
        (card === 'sevenOfClubs' && this.cardIndex === 21) ||
        (card === 'sevenOfDiamonds' && this.cardIndex === 22) ||
        (card === 'sevenOfHearts' && this.cardIndex === 23) ||
        (card === 'sevenOfSpades' && this.cardIndex === 24) ||
        (card === 'eightOfClubs' && this.cardIndex === 25) ||
        (card === 'eightOfDiamonds' && this.cardIndex === 26) ||
        (card === 'eightOfHearts' && this.cardIndex === 27) ||
        (card === 'eightOfSpades' && this.cardIndex === 28) ||
        (card === 'nineOfClubs' && this.cardIndex === 29) ||
        (card === 'nineOfDiamonds' && this.cardIndex === 30) ||
        (card === 'nineOfHearts' && this.cardIndex === 31) ||
        (card === 'nineOfSpades' && this.cardIndex === 32) ||
        (card === 'tenOfClubs' && this.cardIndex === 33) ||
        (card === 'tenOfDiamonds' && this.cardIndex === 34) ||
        (card === 'tenOfHearts' && this.cardIndex === 35) ||
        (card === 'tenOfSpades' && this.cardIndex === 36) ||
        (card === 'jackOfClubs' && this.cardIndex === 37) ||
        (card === 'jackOfDiamonds' && this.cardIndex === 38) ||
        (card === 'jackOfHearts' && this.cardIndex === 39) ||
        (card === 'jackOfSpades' && this.cardIndex === 40) ||
        (card === 'queenOfClubs' && this.cardIndex === 41) ||
        (card === 'queenOfDiamonds' && this.cardIndex === 42) ||
        (card === 'queenOfHearts' && this.cardIndex === 43) ||
        (card === 'queenOfSpades' && this.cardIndex === 44) ||
        (card === 'kingOfClubs' && this.cardIndex === 45) ||
        (card === 'kingOfDiamonds' && this.cardIndex === 46) ||
        (card === 'kingOfHearts' && this.cardIndex === 47) ||
        (card === 'kingOfSpades' && this.cardIndex === 48) ||
        (card === 'aceOfClubs' && this.cardIndex === 49) ||
        (card === 'aceOfDiamonds' && this.cardIndex === 50) ||
        (card === 'aceOfHearts' && this.cardIndex === 51) ||
        (card === 'aceOfSpades' && this.cardIndex === 52)
      ) {
        this.rightAnswers++;
      } else {
        this.wrongAnswers++;
      }
    }
  }

  showPicture(event: MouseEvent) {
    this.clickSound();

    clearTimeout(this.showCardId);
    this.hidePictures();

    this.changeScale(event);

    this.isCardBack = false;
    if (this.cardIndex === 1) {
      this.isTwoOfClubs = true;
    } else if (this.cardIndex === 2) {
      this.isTwoOfDiamonds = true;
    } else if (this.cardIndex === 3) {
      this.isTwoOfHearts = true;
    } else if (this.cardIndex === 4) {
      this.isTwoOfSpades = true;
    } else if (this.cardIndex === 5) {
      this.isThreeOfClubs = true;
    } else if (this.cardIndex === 6) {
      this.isThreeOfDiamonds = true;
    } else if (this.cardIndex === 7) {
      this.isThreeOfHearts = true;
    } else if (this.cardIndex === 8) {
      this.isThreeOfSpades = true;
    } else if (this.cardIndex === 9) {
      this.isFourOfClubs = true;
    } else if (this.cardIndex === 10) {
      this.isFourOfDiamonds = true;
    } else if (this.cardIndex === 11) {
      this.isFourOfHearts = true;
    } else if (this.cardIndex === 12) {
      this.isFourOfSpades = true;
    } else if (this.cardIndex === 13) {
      this.isFiveOfClubs = true;
    } else if (this.cardIndex === 14) {
      this.isFiveOfDiamonds = true;
    } else if (this.cardIndex === 15) {
      this.isFiveOfHearts = true;
    } else if (this.cardIndex === 16) {
      this.isFiveOfSpades = true;
    } else if (this.cardIndex === 17) {
      this.isSixOfClubs = true;
    } else if (this.cardIndex === 18) {
      this.isSixOfDiamonds = true;
    } else if (this.cardIndex === 19) {
      this.isSixOfHearts = true;
    } else if (this.cardIndex === 20) {
      this.isSixOfSpades = true;
    } else if (this.cardIndex === 21) {
      this.isSevenOfClubs = true;
    } else if (this.cardIndex === 22) {
      this.isSevenOfDiamonds = true;
    } else if (this.cardIndex === 23) {
      this.isSevenOfHearts = true;
    } else if (this.cardIndex === 24) {
      this.isSevenOfSpades = true;
    } else if (this.cardIndex === 25) {
      this.isEightOfClubs = true;
    } else if (this.cardIndex === 26) {
      this.isEightOfDiamonds = true;
    } else if (this.cardIndex === 27) {
      this.isEightOfHearts = true;
    } else if (this.cardIndex === 28) {
      this.isEightOfSpades = true;
    } else if (this.cardIndex === 29) {
      this.isNineOfClubs = true;
    } else if (this.cardIndex === 30) {
      this.isNineOfDiamonds = true;
    } else if (this.cardIndex === 31) {
      this.isNineOfHearts = true;
    } else if (this.cardIndex === 32) {
      this.isNineOfSpades = true;
    } else if (this.cardIndex === 33) {
      this.isTenOfClubs = true;
    } else if (this.cardIndex === 34) {
      this.isTenOfDiamonds = true;
    } else if (this.cardIndex === 35) {
      this.isTenOfHearts = true;
    } else if (this.cardIndex === 36) {
      this.isTenOfSpades = true;
    } else if (this.cardIndex === 37) {
      this.isJackOfClubs = true;
    } else if (this.cardIndex === 38) {
      this.isJackOfDiamonds = true;
    } else if (this.cardIndex === 39) {
      this.isJackOfHearts = true;
    } else if (this.cardIndex === 40) {
      this.isJackOfSpades = true;
    } else if (this.cardIndex === 41) {
      this.isQueenOfClubs = true;
    } else if (this.cardIndex === 42) {
      this.isQueenOfDiamonds = true;
    } else if (this.cardIndex === 43) {
      this.isQueenOfHearts = true;
    } else if (this.cardIndex === 44) {
      this.isQueenOfSpades = true;
    } else if (this.cardIndex === 45) {
      this.isKingOfClubs = true;
    } else if (this.cardIndex === 46) {
      this.isKingOfDiamonds = true;
    } else if (this.cardIndex === 47) {
      this.isKingOfHearts = true;
    } else if (this.cardIndex === 48) {
      this.isKingOfSpades = true;
    } else if (this.cardIndex === 49) {
      this.isAceOfClubs = true;
    } else if (this.cardIndex === 50) {
      this.isAceOfDiamonds = true;
    } else if (this.cardIndex === 51) {
      this.isAceOfHearts = true;
    } else if (this.cardIndex === 52) {
      this.isAceOfSpades = true;
    }

    this.cardIndex = this.randomIndex();

    this.showCardId = setTimeout(() => {
      this.hidePictures();
    }, 1000);
  }

  goToMenu() {
    this.router.navigate(['intuition/menu']);
  }

  hidePictures() {
    this.isTwoOfClubs = false;
    this.isTwoOfDiamonds = false;
    this.isTwoOfHearts = false;
    this.isTwoOfSpades = false;
    this.isThreeOfClubs = false;
    this.isThreeOfDiamonds = false;
    this.isThreeOfHearts = false;
    this.isThreeOfSpades = false;
    this.isFourOfClubs = false;
    this.isFourOfDiamonds = false;
    this.isFourOfHearts = false;
    this.isFourOfSpades = false;
    this.isFiveOfClubs = false;
    this.isFiveOfDiamonds = false;
    this.isFiveOfHearts = false;
    this.isFiveOfSpades = false;
    this.isSixOfClubs = false;
    this.isSixOfDiamonds = false;
    this.isSixOfHearts = false;
    this.isSixOfSpades = false;
    this.isSevenOfClubs = false;
    this.isSevenOfDiamonds = false;
    this.isSevenOfHearts = false;
    this.isSevenOfSpades = false;
    this.isEightOfClubs = false;
    this.isEightOfDiamonds = false;
    this.isEightOfHearts = false;
    this.isEightOfSpades = false;
    this.isNineOfClubs = false;
    this.isNineOfDiamonds = false;
    this.isNineOfHearts = false;
    this.isNineOfSpades = false;
    this.isTenOfClubs = false;
    this.isTenOfDiamonds = false;
    this.isTenOfHearts = false;
    this.isTenOfSpades = false;
    this.isJackOfClubs = false;
    this.isJackOfDiamonds = false;
    this.isJackOfHearts = false;
    this.isJackOfSpades = false;
    this.isQueenOfClubs = false;
    this.isQueenOfDiamonds = false;
    this.isQueenOfHearts = false;
    this.isQueenOfSpades = false;
    this.isKingOfClubs = false;
    this.isKingOfDiamonds = false;
    this.isKingOfHearts = false;
    this.isKingOfSpades = false;
    this.isAceOfClubs = false;
    this.isAceOfDiamonds = false;
    this.isAceOfHearts = false;
    this.isAceOfSpades = false;
    this.isCardBack = true;
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
