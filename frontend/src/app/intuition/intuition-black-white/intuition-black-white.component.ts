import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { HttpService } from 'src/app/services/http.service';
import { soundToggle } from 'src/app/store/actions/sound.action';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-intuition-black-white',
  templateUrl: './intuition-black-white.component.html',
  styleUrls: ['./intuition-black-white.component.less'],
})
export class IntuitionBlackWhiteComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService,
    private audioService: GeneralAudioService
  ) {}

  ngOnInit(): void {
    this.colorIndex = this.randomIndex();
  }

  ngOnDestroy(): void {
    let login = localStorage.getItem('login') || '';

    this.httpService
      .postIntuitionResult({
        mode: 'black-white',
        login: login,
        right: this.rightAnswers,
        wrong: this.wrongAnswers,
      })
      .subscribe(() => {});
  }

  randomIndex() {
    return Math.floor(Math.random() * (3 - 1) + 1);
  }

  isAudioOn: boolean = true;

  colorIndex = 0;

  isBlack = false;
  isWhite = false;

  showColorId: any;

  rightAnswers = 0;
  wrongAnswers = 0;

  percentHint = 'Среднестатистический показатель 50.0%';

  changeScale(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let color = (target as HTMLElement).dataset.color;

      if (
        (color === 'black' && this.colorIndex === 1) ||
        (color === 'white' && this.colorIndex === 2)
      ) {
        this.rightAnswers++;
      } else {
        this.wrongAnswers++;
      }
    }
  }

  showColor(event: MouseEvent) {
    this.audioService.click();

    clearTimeout(this.showColorId);
    this.hideColors();

    this.changeScale(event);

    if (this.colorIndex === 1) {
      this.isBlack = true;
    } else if (this.colorIndex === 2) {
      this.isWhite = true;
    }

    this.colorIndex = this.randomIndex();

    this.showColorId = setTimeout(() => {
      this.hideColors();
    }, 1000);
  }

  goToMenu() {
    this.audioService.click();
    this.router.navigate(['intuition/menu']);
  }

  hideColors() {
    this.isBlack = false;
    this.isWhite = false;
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }
}
