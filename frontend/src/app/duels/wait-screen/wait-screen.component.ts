import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectEnemyType,
  selectIsEnemyCreated,
} from 'src/app/store/selectors/duels/generalInfo.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/services/websocket.service';
import {
  selectUserId,
  selectUserName,
} from 'src/app/store/selectors/duels/users.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wait-screen',
  templateUrl: './wait-screen.component.html',
  styleUrls: ['./wait-screen.component.less'],
})
export class WaitScreenComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private wssService: WebsocketService,
    private router: Router
  ) {}

  text = '';

  enemyTypeSubscription = new Subscription();
  userNameSubscription = new Subscription();
  userIdSubscription = new Subscription();
  isEnemyCreatedSubscription = new Subscription();

  ngOnInit(): void {
    let enemyType;

    this.enemyTypeSubscription = this.store
      .select(selectEnemyType)
      .subscribe((type) => {
        enemyType = type;

        if (type === 'human') {
          this.text = 'Поиск противника...';
        } else {
          this.text = 'Создание игры...';
        }
      });

    let name;

    this.userNameSubscription = this.store
      .select(selectUserName)
      .subscribe((userName) => {
        name = userName;
      });

    let id;

    this.userIdSubscription = this.store
      .select(selectUserId)
      .subscribe((userId) => {
        id = userId;
      });

    let gameInformation = {
      header: 'createGame',
      user: {
        name: name,
        id: id,
        enemyType: enemyType,
        idGame: '',
        actionPoints: 5,
        energyPoints: 5,
        position: {
          user: [[0, 3]],
          enemy: [[6, 3]],
        },
        battlefield: [],
        maxHealth: 200,
        health: 200,
        muve: '',
        elements: [],
        forms: [],
        buffs: [],
        debuffs: [],
      },
    };

    this.wssService.sendMessage(gameInformation);

    this.isEnemyCreatedSubscription = this.store
      .select(selectIsEnemyCreated)
      .subscribe((state) => {
        if (state) this.router.navigate(['/duels/game']);
      });
  }

  ngOnDestroy(): void {
    this.enemyTypeSubscription.unsubscribe();
    this.userNameSubscription.unsubscribe();
    this.userIdSubscription.unsubscribe();
    this.isEnemyCreatedSubscription.unsubscribe();
  }
}
