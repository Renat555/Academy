import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-user-defined-range',
  templateUrl: './user-defined-range.component.html',
  styleUrls: ['./user-defined-range.component.less'],
})
export class UserDefinedRangeComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  randomIndex() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }

  firstNumber = new FormControl('');
  secondNumber = new FormControl('');

  isAudioOn = true;

  checkNumbers(event: KeyboardEvent) {
    let target = event.target;

    let sequence = (target as HTMLElement).dataset.input;

    if (sequence == 'first') {
      if (this.firstNumber.value.length > 8) return false;
    } else if (sequence == 'second') {
      if (this.secondNumber.value.length > 8) return false;
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
}
