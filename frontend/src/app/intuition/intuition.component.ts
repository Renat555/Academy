import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-intuition',
  templateUrl: './intuition.component.html',
  styleUrls: ['./intuition.component.less'],
})
export class IntuitionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.pictureIndex = this.randomIndex();
  }

  randomIndex() {
    return Math.floor(Math.random() * (7 - 1) + 1);
  }

  @ViewChild('picture') picture!: ElementRef;

  isTriangle: boolean = false;
  isTriangle2: boolean = false;
  isSquare: boolean = false;
  isSquare2: boolean = false;
  isHexagon: boolean = false;
  isHexagon2: boolean = false;

  pictureIndex: number = 0;

  showPictureId: any;

  showPicture() {
    this.clickSound();

    clearTimeout(this.showPictureId);
    this.hidePictures();

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

  goToHall() {
    this.router.navigate(['']);
  }

  hidePictures() {
    this.isTriangle = false;
    this.isTriangle2 = false;
    this.isSquare = false;
    this.isSquare2 = false;
    this.isHexagon = false;
    this.isHexagon2 = false;
  }

  clickSound() {
    //if (!this.isAudioOn) return;
    let sound = new Audio('./../assets/audio/click.mp3');
    sound.play();
  }
}
