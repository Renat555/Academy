import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/http.service';
import { addUserName } from 'src/app/store/actions/duels/users.actions';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
import { addLogin, userIsAuth } from 'src/app/store/actions/user.actions';
import { selectSoundSwitch } from 'src/app/store/selectors/sound.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less'],
})
export class AuthorizationComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.store.select(selectSoundSwitch).subscribe((state) => {
      this.isAudioOn = state;
    });
  }

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
    this.router.navigate(['']);
  }

  goToReg() {
    this.router.navigate(['/auth/registration']);
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
