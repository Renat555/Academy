import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { soundToggle } from 'src/app/store/actions/sound.action';
import { Result } from 'src/app/store/reducers/intuition/results.reducer';
import {
  selectBlackWhite,
  selectCardSuits,
  selectColors,
  selectFigures,
  selectPlayingCards,
} from 'src/app/store/selectors/intuition/results.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-detail-stat',
  templateUrl: './detail-stat.component.html',
  styleUrls: ['./detail-stat.component.less'],
})
export class DetailStatComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private audioService: GeneralAudioService
  ) {}

  figuresSubscription = new Subscription();
  cardSuitsSubscription = new Subscription();
  colorsSubscription = new Subscription();
  blackWhiteSubscription = new Subscription();
  playingCardsSubscription = new Subscription();

  ngOnInit(): void {
    let mode = this.route.snapshot.queryParams['mode'];

    if (mode === 'figures') {
      this.figuresSubscription = this.store
        .select(selectFigures)
        .subscribe((state) => {
          this.items = state;
          this.items = this.createDates(this.items);
        });
      this.header = 'Фигуры';
    } else if (mode === 'cardSuits') {
      this.cardSuitsSubscription = this.store
        .select(selectCardSuits)
        .subscribe((state) => {
          this.items = state;
          this.items = this.createDates(this.items);
        });
      this.header = 'Масти';
    } else if (mode === 'colors') {
      this.colorsSubscription = this.store
        .select(selectColors)
        .subscribe((state) => {
          this.items = state;
          this.items = this.createDates(this.items);
        });
      this.header = 'Цвета';
    } else if (mode === 'blackWhite') {
      this.blackWhiteSubscription = this.store
        .select(selectBlackWhite)
        .subscribe((state) => {
          this.items = state;
          this.items = this.createDates(this.items);
        });
      this.header = 'Черное и белое';
    } else if (mode === 'playingCards') {
      this.playingCardsSubscription = this.store
        .select(selectPlayingCards)
        .subscribe((state) => {
          this.items = state;
          this.items = this.createDates(this.items);
        });
      this.header = 'Карты';
    }
  }

  createDates(arr: Result[]) {
    let result: Result[] = [];

    for (let i = 0; i < arr.length; i++) {
      result[i] = { ...arr[i] };
      result[i]['date'] = new Date(arr[i]['date']).toLocaleString('ru', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    }

    return result;
  }

  items: Result[] = [];
  results: any;
  header = '';

  isAudioOn = false;

  goToGeneralStat() {
    this.audioService.click();
    this.router.navigate(['profile/generalStat']);
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
