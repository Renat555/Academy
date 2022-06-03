import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeneralAudioService } from 'src/app/services/audio/general-audio.service';
import { HttpService } from 'src/app/services/http.service';
import { addUserName } from 'src/app/store/actions/duels/users.actions';
import { soundToggle } from 'src/app/store/actions/sound.action';
import { addLogin, userIsAuth } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private store: Store<AppState>,
    private audio: GeneralAudioService
  ) {}

  model = {
    login: '',
    password: '',
    passwordRepeat: '',
  };

  isLoginEmpty = false;
  isLoginExists = false;
  isPasswordEmpty = false;
  isPasswordsNotMatch = false;

  isAudioOn = true;

  submit(form: NgForm) {
    if (form.controls.login.value === '') {
      this.isLoginEmpty = true;
      this.isLoginExists = false;
      this.isPasswordEmpty = false;
      this.isPasswordsNotMatch = false;
    } else if (form.controls.password.value === '') {
      this.isLoginEmpty = false;
      this.isLoginExists = false;
      this.isPasswordEmpty = true;
      this.isPasswordsNotMatch = false;
    } else if (
      form.controls.password.value !== form.controls.passwordRepeat.value
    ) {
      this.isLoginEmpty = false;
      this.isLoginExists = false;
      this.isPasswordEmpty = false;
      this.isPasswordsNotMatch = true;
    } else {
      this.httpService
        .postRegistrationData(this.model)
        .subscribe((data: any) => {
          if (data === 'login exists') {
            this.isLoginEmpty = false;
            this.isLoginExists = true;
            this.isPasswordEmpty = false;
            this.isPasswordsNotMatch = false;
          } else {
            this.store.dispatch(userIsAuth());
            this.store.dispatch(addUserName({ name: data.userLogin }));
            this.store.dispatch(addLogin({ login: data.userLogin }));
            localStorage.setItem('token', data.token);
            localStorage.setItem('login', data.userLogin);
            this.goToMenu();
          }
        });
    }
  }

  goToMenu() {
    this.audio.click();
    this.router.navigate(['']);
  }

  goToAuth() {
    this.router.navigate(['auth/authorization']);
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }
}
