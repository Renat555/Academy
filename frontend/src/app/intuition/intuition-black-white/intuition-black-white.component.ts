import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intuition-black-white',
  templateUrl: './intuition-black-white.component.html',
  styleUrls: ['./intuition-black-white.component.less'],
})
export class IntuitionBlackWhiteComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.colorIndex = this.randomIndex();
  }

  randomIndex() {
    return Math.floor(Math.random() * (3 - 1) + 1);
  }

  colorIndex = 0;

  isBlack = false;
  isWhite = false;

  showColorId: any;

  rightAnswers = 0;
  wrongAnswers = 0;

  percentRightAnswers = 0;

  percent = '0.0%';
  ratio = this.rightAnswers + '/' + this.wrongAnswers;

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

    let percentAll = this.rightAnswers + this.wrongAnswers;
    this.percentRightAnswers = (this.rightAnswers * 100) / percentAll;

    this.percent = this.percentRightAnswers.toFixed(1) + '%';
    this.ratio = this.rightAnswers + '/' + this.wrongAnswers;
  }

  showColor(event: MouseEvent) {
    this.clickSound();

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
    this.router.navigate(['intuition/intuitionMenu']);
  }

  hideColors() {
    this.isBlack = false;
    this.isWhite = false;
  }

  clickSound() {
    let sound = new Audio('./../assets/audio/click.mp3');
    sound.play();
  }
}
