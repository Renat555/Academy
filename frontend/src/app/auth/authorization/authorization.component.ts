import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/http.service';
import { soundOff, soundOn } from 'src/app/store/actions/sound.action';
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
      this.httpService.postAuthData(this.model).subscribe((data) => {
        console.log(data);
      });
    }
  }

  goToMenu() {
    this.router.navigate(['']);
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
