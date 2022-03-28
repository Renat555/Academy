import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, observable, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import {
  enemyCreated,
  enemyMuve,
  userMuve,
} from './store/actions/duels/generalInfo.actions';
import { setEnemy } from './store/actions/duels/map.actions';
import {
  addEnemyName,
  changeEnemyActionPoints,
  changeUserActionPoints,
} from './store/actions/duels/users.actions';
import { selectMapEnemy } from './store/selectors/duels/map.selectors';
import { AppState } from './store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private store: Store<AppState>) {
    this.socket = webSocket(environment.apiWss);

    this.socket.subscribe((gameInformation) => {
      console.log(gameInformation);

      if (gameInformation['header'] === 'createGame') {
        this.store.dispatch(
          addEnemyName({ name: gameInformation['enemy']['name'] })
        );
        if (gameInformation['enemy']['muve'] === 0) {
          this.store.dispatch(userMuve());
        } else {
          this.store.dispatch(enemyMuve());
        }
        this.store.dispatch(enemyCreated());
      } else if (gameInformation['header'] === 'playerMovement') {
        this.store.dispatch(
          changeUserActionPoints({
            points: gameInformation['user']['actionPoints'],
          })
        );

        this.store.dispatch(
          changeEnemyActionPoints({
            points: gameInformation['enemy']['actionPoints'],
          })
        );

        let enemyPath = gameInformation['user']['position']['enemy'];

        let enemyDestination = enemyPath[enemyPath.length - 1];
        let enemyCurrentPosition;

        this.store.select(selectMapEnemy).subscribe((coord) => {
          enemyCurrentPosition = coord;
        });

        if (
          enemyDestination === undefined ||
          enemyCurrentPosition === enemyDestination
        )
          return;
        console.log('dispatch setEnemy');

        this.store.dispatch(
          setEnemy({ row: enemyDestination[0], col: enemyDestination[1] })
        );
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
