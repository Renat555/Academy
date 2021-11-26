import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from '../../store/state/app.state';

@Component({
  selector: 'app-intuition-figures',
  templateUrl: './intuition-figures.component.html',
  styleUrls: ['./intuition-figures.component.less'],
})
export class IntuitionFiguresComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });

    this.pictureIndex = this.randomIndex();
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

  percentRightAnswers = 0;

  percent = '0.0%';
  ratio = this.rightAnswers + '/' + this.wrongAnswers;

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

    let percentAll = this.rightAnswers + this.wrongAnswers;
    this.percentRightAnswers = (this.rightAnswers * 100) / percentAll;

    this.percent = this.percentRightAnswers.toFixed(1) + '%';
    this.ratio = this.rightAnswers + '/' + this.wrongAnswers;
  }

  showPicture(event: MouseEvent) {
    this.clickSound();

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
