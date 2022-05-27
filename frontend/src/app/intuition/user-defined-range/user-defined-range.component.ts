import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-user-defined-range',
  templateUrl: './user-defined-range.component.html',
  styleUrls: ['./user-defined-range.component.less'],
})
export class UserDefinedRangeComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {}

  soundSwitchSubscription = new Subscription();

  ngOnInit(): void {
    this.soundSwitchSubscription = this.store
      .select(selectSoundSwitch)
      .subscribe((state) => {
        this.isAudioOn = state;
      });
  }

  randomIndex() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }

  firstNumber = new FormControl('');
  secondNumber = new FormControl('');
  userNumber = new FormControl('');

  isAudioOn = true;

  discrepancy = 0;

  result = 0;

  nextResult = 0;

  isYes = false;
  isNo = false;

  checkNumbers(event: KeyboardEvent) {
    let target = event.target;

    let sequence = (target as HTMLElement).dataset.input;

    if (sequence == 'first') {
      if (this.firstNumber.value.length > 8) return false;
    } else if (sequence == 'second') {
      if (this.secondNumber.value.length > 8) return false;
    } else if (sequence == 'user') {
      if (this.userNumber.value.length > 8) return false;
    }

    if (
      event.key !== '1' &&
      event.key !== '2' &&
      event.key !== '3' &&
      event.key !== '4' &&
      event.key !== '5' &&
      event.key !== '6' &&
      event.key !== '7' &&
      event.key !== '8' &&
      event.key !== '9' &&
      event.key !== '0'
    ) {
      return false;
    } else {
      return true;
    }
  }

  showAnswer() {
    this.clickSound();

    let min = +this.firstNumber.value;
    let max = +this.secondNumber.value;
    let userAnswer = +this.userNumber.value;

    // if the user has not entered a value in the 'userNumber' input we only check whether the maximum value is greater than the minimum
    if (this.userNumber.value !== '') {
      if (min >= max || userAnswer < min || userAnswer > max) return;
    } else {
      if (min >= max) return;
    }

    this.result = this.nextResult;

    if (this.userNumber.value === '') {
      this.discrepancy = 0;

      this.isYes = false;
      this.isNo = false;
    } else {
      this.discrepancy = Math.round(
        (Math.abs(this.result - userAnswer) * 100) / (max - min)
      );

      if (this.result === userAnswer) {
        this.isYes = true;
        this.isNo = false;
      } else {
        this.isYes = false;
        this.isNo = true;
      }
    }

    max++;

    this.nextResult = Math.floor(Math.random() * (max - min)) + min;
  }

  calculateAnswer() {
    let min = +this.firstNumber.value;
    let max = +this.secondNumber.value;

    if (min >= max) return;

    max++;

    this.nextResult = Math.floor(Math.random() * (max - min)) + min;
  }

  goToMenu() {
    this.router.navigate(['intuition/menu']);
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

  ngOnDestroy(): void {
    this.soundSwitchSubscription.unsubscribe();
  }
}
