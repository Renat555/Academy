import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/http.service';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.less'],
})
export class ColorsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });

    this.colorIndex = this.randomIndex();
  }

  ngOnDestroy(): void {
    let login = localStorage.getItem('login') || '';

    this.httpService
      .postIntuitionResult({
        mode: 'colors',
        login: login,
        right: this.rightAnswers,
        wrong: this.wrongAnswers,
      })
      .subscribe(() => {});
  }

  randomIndex() {
    return Math.floor(Math.random() * (8 - 1) + 1);
  }

  isAudioOn: boolean = true;

  colorIndex = 0;

  isRed = false;
  isOrange = false;
  isYellow = false;
  isGreen = false;
  isIndigo = false;
  isBlue = false;
  isViolet = false;

  showColorId: any;

  rightAnswers = 0;
  wrongAnswers = 0;

  percentHint = 'Среднестатистический показатель 14.3%';

  changeScale(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let color = (target as HTMLElement).dataset.color;

      if (
        (color === 'red' && this.colorIndex === 1) ||
        (color === 'orange' && this.colorIndex === 2) ||
        (color === 'yellow' && this.colorIndex === 3) ||
        (color === 'green' && this.colorIndex === 4) ||
        (color === 'indigo' && this.colorIndex === 5) ||
        (color === 'blue' && this.colorIndex === 6) ||
        (color === 'violet' && this.colorIndex === 7)
      ) {
        this.rightAnswers++;
      } else {
        this.wrongAnswers++;
      }
    }
  }

  showColor(event: MouseEvent) {
    this.clickSound();

    clearTimeout(this.showColorId);
    this.hideColors();

    this.changeScale(event);

    if (this.colorIndex === 1) {
      this.isRed = true;
    } else if (this.colorIndex === 2) {
      this.isOrange = true;
    } else if (this.colorIndex === 3) {
      this.isYellow = true;
    } else if (this.colorIndex === 4) {
      this.isGreen = true;
    } else if (this.colorIndex === 5) {
      this.isIndigo = true;
    } else if (this.colorIndex === 6) {
      this.isBlue = true;
    } else if (this.colorIndex === 7) {
      this.isViolet = true;
    }

    this.colorIndex = this.randomIndex();

    this.showColorId = setTimeout(() => {
      this.hideColors();
    }, 1000);
  }

  goToMenu() {
    this.router.navigate(['intuition/menu']);
  }

  hideColors() {
    this.isRed = false;
    this.isOrange = false;
    this.isYellow = false;
    this.isGreen = false;
    this.isIndigo = false;
    this.isBlue = false;
    this.isViolet = false;
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
