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
  changeEnemyEnergyPoints,
  changeUserActionPoints,
  changeUserEnergyPoints,
  setEnemyHealth,
  setEnemyMaxHealth,
  setUserHealth,
  setUserMaxHealth,
} from './store/actions/duels/users.actions';
import { selectMapEnemy } from './store/selectors/duels/map.selectors';
import { AppState } from './store/state/app.state';
import {
  addDescriptionBlock,
  addDescriptionRow,
} from './store/actions/duels/description.actions';

interface GameInformation {
  header: string;
  user: Player;
  enemy: Player;
}

interface Player {
  actionPoints: number;
  energyPoints: number;
  battlefield: [];
  buffs: [];
  debuffs: [];
  elements: string[];
  forms: string[];
  enemyType: string;
  health: number;
  maxHealth: number;
  id: string;
  idGame: string;
  muve: number;
  name: string;
  description: string;
  position: {
    user: number[][];
    enemy: number[][];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private store: Store<AppState>) {
    this.socket = webSocket(environment.apiWss);

    this.socket.subscribe((gameInformation) => {
      console.log(gameInformation);
      this.loadGameInformation(gameInformation);

      if (gameInformation['header'] === 'createGame') {
        this.store.dispatch(enemyCreated());
      } else if (gameInformation['header'] === 'playerMovement') {
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

        this.store.dispatch(
          setEnemy({ row: enemyDestination[0], col: enemyDestination[1] })
        );
      } else if (gameInformation['header'] === 'changeMuve') {
        this.store.dispatch(
          addDescriptionBlock({
            description: 'Следующий ход \u269C \u269C \u269C \u269C \u269C',
          })
        );
      }
    });
  }

  loadGameInformation(info: GameInformation) {
    if (info['user']['muve'] === 0) {
      this.store.dispatch(enemyMuve());
    } else {
      this.store.dispatch(userMuve());
    }

    this.store.dispatch(
      changeEnemyActionPoints({ points: info['enemy']['actionPoints'] })
    );
    this.store.dispatch(
      changeEnemyEnergyPoints({ points: info['enemy']['energyPoints'] })
    );
    this.store.dispatch(
      changeUserActionPoints({ points: info['user']['actionPoints'] })
    );
    this.store.dispatch(
      changeUserEnergyPoints({ points: info['user']['energyPoints'] })
    );
    this.store.dispatch(setUserHealth({ health: info['user']['health'] }));
    this.store.dispatch(setEnemyHealth({ health: info['enemy']['health'] }));
    this.store.dispatch(
      setUserMaxHealth({ health: info['user']['maxHealth'] })
    );
    this.store.dispatch(
      setEnemyMaxHealth({ health: info['enemy']['maxHealth'] })
    );
    this.store.dispatch(addEnemyName({ name: info['enemy']['name'] }));
    if (info['user']['description']) {
      this.store.dispatch(
        addDescriptionRow({ description: info['user']['description'] })
      );
    }
  }

  socket: WebSocketSubject<any>;

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}
