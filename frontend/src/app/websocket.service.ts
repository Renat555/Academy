import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, observable, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { enemyCreated } from './store/actions/duels/generalInfo.actions';
import { addEnemyName } from './store/actions/duels/users.actions';
import { AppState } from './store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private store: Store<AppState>) {
    this.socket = webSocket(environment.apiWss);

    this.socket.subscribe((gameInformation) => {
      if (gameInformation['header'] === 'createGame') {
        this.store.dispatch(
          addEnemyName({ name: gameInformation['enemy']['name'] })
        );
        this.store.dispatch(enemyCreated());
      }
    });
  }

  socket: WebSocketSubject<any>;

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}
