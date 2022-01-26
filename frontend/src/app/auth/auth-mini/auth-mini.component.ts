import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectUserIsAuth,
  selectUserName,
} from 'src/app/store/selectors/user.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-auth-mini',
  templateUrl: './auth-mini.component.html',
  styleUrls: ['./auth-mini.component.less'],
})
export class AuthMiniComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectUserName).subscribe((state) => {
      this.userName = state;
    });

    this.store.select(selectUserIsAuth).subscribe((state) => {
      this.isAuthorized = state;
    });
  }

  userName = '';
  isAuthorized = false;

  goToAuthorization() {
    this.router.navigate(['auth/authorization']);
  }

  goToRegistration() {
    this.router.navigate(['auth/registration']);
  }
}
