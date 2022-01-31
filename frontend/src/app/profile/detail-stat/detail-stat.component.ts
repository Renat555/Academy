import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { Result } from 'src/app/store/reducers/intuition/results.reducer';
import {
  selectBlackWhite,
  selectCardSuits,
  selectColors,
  selectFigures,
  selectPlayingCards,
} from 'src/app/store/selectors/intuition/results.selectors';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-detail-stat',
  templateUrl: './detail-stat.component.html',
  styleUrls: ['./detail-stat.component.less'],
})
export class DetailStatComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });

    let mode = this.route.snapshot.queryParams['mode'];

    if (mode === 'figures') {
      this.store.select(selectFigures).subscribe((state) => {
        this.items = state;
        this.items = this.createDates(this.items);
      });
      this.header = 'Фигуры';
    } else if (mode === 'cardSuits') {
      this.store.select(selectCardSuits).subscribe((state) => {
        this.items = state;
        this.items = this.createDates(this.items);
      });
      this.header = 'Масти';
    } else if (mode === 'colors') {
      this.store.select(selectColors).subscribe((state) => {
        this.items = state;
        this.items = this.createDates(this.items);
      });
      this.header = 'Цвета';
    } else if (mode === 'blackWhite') {
      this.store.select(selectBlackWhite).subscribe((state) => {
        this.items = state;
        this.items = this.createDates(this.items);
      });
      this.header = 'Черное и белое';
    } else if (mode === 'playingCards') {
      this.store.select(selectPlayingCards).subscribe((state) => {
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
    this.router.navigate(['profile/generalStat']);
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
