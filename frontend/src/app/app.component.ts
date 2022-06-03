import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HttpService } from './services/http.service';
import {
  addLogin,
  userIsAuth,
  userIsNotAuth,
} from './store/actions/user.actions';
import { AppState } from './store/state/app.state';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpService,
    private store: Store<AppState>,
    private router: Router,
    private wssService: WebsocketService
  ) {}

  isAuthSubscription = new Subscription();

  ngOnInit() {
    this.isAuthSubscription = this.httpService
      .getIsAuth()
      .subscribe((data: any) => {
        if (data.message === 'Authentication failed') {
          this.store.dispatch(userIsNotAuth());
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        } else {
          let login = localStorage.getItem('login');
          if (login) {
            this.store.dispatch(addLogin({ login: login }));
          }
          this.store.dispatch(userIsAuth());
        }
      });
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
