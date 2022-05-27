import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectUserIsAuth,
  selectUserName,
} from 'src/app/store/selectors/user.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { userIsNotAuth } from 'src/app/store/actions/user.actions';
import {
  addUserName,
  deleteUserName,
} from 'src/app/store/actions/duels/users.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-mini',
  templateUrl: './auth-mini.component.html',
  styleUrls: ['./auth-mini.component.less'],
})
export class AuthMiniComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<AppState>) {}

  userNameSubscription = new Subscription();
  userIsAuthSubscription = new Subscription();

  ngOnInit(): void {
    this.userNameSubscription = this.store
      .select(selectUserName)
      .subscribe((state) => {
        this.userName = state;
      });

    this.userIsAuthSubscription = this.store
      .select(selectUserIsAuth)
      .subscribe((state) => {
        this.isAuthorized = state;
      });
  }

  userName = '';
  isAuthorized = false;

  logout() {
    this.store.dispatch(userIsNotAuth());
    this.store.dispatch(deleteUserName());
    localStorage.removeItem('token');
  }

  goToAuthorization() {
    this.router.navigate(['auth/authorization']);
  }

  goToRegistration() {
    this.router.navigate(['auth/registration']);
  }

  goToProfile() {
    this.router.navigate(['profile/generalStat']);
  }

  ngOnDestroy(): void {
    this.userNameSubscription.unsubscribe();
    this.userIsAuthSubscription.unsubscribe();
  }
}
