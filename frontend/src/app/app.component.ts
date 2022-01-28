import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from './http.service';
import {
  addLogin,
  userIsAuth,
  userIsNotAuth,
} from './store/actions/user.actions';
import { AppState } from './store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [HttpService],
})
export class AppComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.httpService.getIsAuth().subscribe((data: any) => {
      if (data.message === 'Authentication failed') {
        this.store.dispatch(userIsNotAuth());
        localStorage.removeItem('token');
      } else {
        let login = localStorage.getItem('login');
        if (login) {
          this.store.dispatch(addLogin({ login: login }));
        }
        this.store.dispatch(userIsAuth());
      }
    });
  }
}
