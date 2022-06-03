import { Component } from '@angular/core';
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
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less'],
})
export class AuthorizationComponent {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService,
    private audio: GeneralAudioService
  ) {}

  model = {
    login: '',
    password: '',
  };

  isLoginEmpty = false;
  isUserNotFound = false;
  isPasswordEmpty = false;
  isWrongPassword = false;

  isAudioOn = true;

  submit(form: NgForm) {
    if (form.controls.login.value === '') {
      this.isLoginEmpty = true;
      this.isUserNotFound = false;
      this.isPasswordEmpty = false;
      this.isWrongPassword = false;
    } else if (form.controls.password.value === '') {
      this.isLoginEmpty = false;
      this.isUserNotFound = false;
      this.isPasswordEmpty = true;
      this.isWrongPassword = false;
    } else {
      this.httpService.postAuthData(this.model).subscribe((data: any) => {
        if (data === 'user not found') {
          this.isLoginEmpty = false;
          this.isUserNotFound = true;
          this.isPasswordEmpty = false;
          this.isWrongPassword = false;
        } else if (data === 'wrong password') {
          this.isLoginEmpty = false;
          this.isUserNotFound = false;
          this.isPasswordEmpty = false;
          this.isWrongPassword = true;
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

  goToReg() {
    this.router.navigate(['/auth/registration']);
  }

  toggleSound() {
    this.store.dispatch(soundToggle());
  }
}
