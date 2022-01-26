import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/http.service';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

  model = {
    login: '',
    password: '',
    passwordRepeat: '',
    email: '',
  };

  isLoginEmpty = false;
  isLoginExists = false;
  isPasswordEmpty = false;
  isPasswordsNotMatch = false;
  isEmailEmpty = false;
  isEmailCorrect = false;

  isMessageActive = false;
  message = '';

  isAudioOn = true;

  submit(form: NgForm) {
    if (form.controls.login.value === '') {
      this.isLoginEmpty = true;
      this.isLoginExists = false;
      this.isPasswordEmpty = false;
      this.isPasswordsNotMatch = false;
      this.isEmailEmpty = false;
      this.isEmailCorrect = false;
    } else if (form.controls.password.value === '') {
      this.isLoginEmpty = false;
      this.isLoginExists = false;
      this.isPasswordEmpty = true;
      this.isPasswordsNotMatch = false;
      this.isEmailEmpty = false;
      this.isEmailCorrect = false;
    } else if (
      form.controls.password.value !== form.controls.passwordRepeat.value
    ) {
      this.isLoginEmpty = false;
      this.isLoginExists = false;
      this.isPasswordEmpty = false;
      this.isPasswordsNotMatch = true;
      this.isEmailEmpty = false;
      this.isEmailCorrect = false;
    } else if (form.controls.email.value === '') {
      this.isLoginEmpty = false;
      this.isLoginExists = false;
      this.isPasswordEmpty = false;
      this.isPasswordsNotMatch = false;
      this.isEmailEmpty = true;
      this.isEmailCorrect = false;
    } else if (!form.controls.email.valid) {
      this.isLoginEmpty = false;
      this.isLoginExists = false;
      this.isPasswordEmpty = false;
      this.isPasswordsNotMatch = false;
      this.isEmailEmpty = false;
      this.isEmailCorrect = true;
    } else {
      this.httpService.postRegistrationData(this.model).subscribe((data) => {
        if (data === 'user saved') {
          this.message =
            'На указанную при регистрацию почту, выслано письмо для подтверждения.';
          this.isMessageActive = true;
        } else {
          this.isLoginEmpty = false;
          this.isLoginExists = true;
          this.isPasswordEmpty = false;
          this.isPasswordsNotMatch = false;
          this.isEmailEmpty = false;
          this.isEmailCorrect = false;
        }
      });
    }
  }

  goToMenu() {
    this.router.navigate(['']);
  }

  goToAuth() {
    this.router.navigate(['auth/authorization']);
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