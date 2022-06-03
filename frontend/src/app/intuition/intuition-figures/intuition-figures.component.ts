import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { HttpService } from 'src/app/services/http.service';
import { soundToggle } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from '../../store/state/app.state';

@Component({
  selector: 'app-intuition-figures',
  templateUrl: './intuition-figures.component.html',
  styleUrls: ['./intuition-figures.component.less'],
})
export class IntuitionFiguresComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService,
    private audioService: GeneralAudioService
  ) {}

  ngOnInit() {
    this.pictureIndex = this.randomIndex();
  }

  ngOnDestroy(): void {
    let login = localStorage.getItem('login') || '';

    this.httpService
      .postIntuitionResult({
        mode: 'figures',
        login: login,
        right: this.rightAnswers,
        wrong: this.wrongAnswers,
      })
      .subscribe(() => {});
  }

  randomIndex() {
    return Math.floor(Math.random() * (7 - 1) + 1);
  }

  isTriangle: boolean = false;
  isTriangle2: boolean = false;
  isSquare: boolean = false;
  isSquare2: boolean = false;
  isHexagon: boolean = false;
  isHexagon2: boolean = false;

  isAudioOn: boolean = true;

  pictureIndex: number = 0;

  showPictureId: any;

  rightAnswers = 0;
  wrongAnswers = 0;

  percentHint = 'Среднестатистический показатель 16.7%';

  changeScale(event: MouseEvent) {
    let target = event.currentTarget;

    if (target) {
      let picture = (target as HTMLElement).dataset.picture;

      if (
        (picture === 'triangle' && this.pictureIndex === 1) ||
        (picture === 'triangle2' && this.pictureIndex === 2) ||
        (picture === 'square' && this.pictureIndex === 3) ||
        (picture === 'square2' && this.pictureIndex === 4) ||
        (picture === 'hexagon' && this.pictureIndex === 5) ||
        (picture === 'hexagon2' && this.pictureIndex === 6)
      ) {
        this.rightAnswers++;
      } else {
        this.wrongAnswers++;
      }
    }
  }

  showPicture(event: MouseEvent) {
    this.audioService.click();

    clearTimeout(this.showPictureId);
    this.hidePictures();

    this.changeScale(event);

    if (this.pictureIndex === 1) {
      this.isTriangle = true;
    } else if (this.pictureIndex === 2) {
      this.isTriangle2 = true;
    } else if (this.pictureIndex === 3) {
      this.isSquare = true;
    } else if (this.pictureIndex === 4) {
      this.isSquare2 = true;
    } else if (this.pictureIndex === 5) {
      this.isHexagon = true;
    } else if (this.pictureIndex === 6) {
      this.isHexagon2 = true;
    }

    this.pictureIndex = this.randomIndex();

    this.showPictureId = setTimeout(() => {
      this.hidePictures();
    }, 1000);
  }

  goToMenu() {
    this.audioService.click();
    this.router.navigate(['intuition/menu']);
  }

  hidePictures() {
    this.isTriangle = false;
    this.isTriangle2 = false;
    this.isSquare = false;
    this.isSquare2 = false;
    this.isHexagon = false;
    this.isHexagon2 = false;
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }
}
