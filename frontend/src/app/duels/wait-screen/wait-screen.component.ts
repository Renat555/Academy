import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectEnemyType,
  selectIsEnemyCreated,
} from 'src/app/store/selectors/duels/generalInfo.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/websocket.service';
import {
  selectUserId,
  selectUserName,
} from 'src/app/store/selectors/duels/users.selectors';

@Component({
  selector: 'app-wait-screen',
  templateUrl: './wait-screen.component.html',
  styleUrls: ['./wait-screen.component.less'],
})
export class WaitScreenComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private wssService: WebsocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let enemyType;

    this.store.select(selectEnemyType).subscribe((type) => {
      enemyType = type;

      if (type === 'human') {
        this.text = 'Поиск противника...';
      } else {
        this.text = 'Создание игры...';
      }
    });

    let name;

    this.store.select(selectUserName).subscribe((userName) => {
      name = userName;
    });

    let id;

    this.store.select(selectUserId).subscribe((userId) => {
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
          user: [],
          enemy: [],
        },
        battlefield: [],
        maxHealth: '200',
        health: '200',
        muve: '',
        elements: [],
        forms: [],
        buffs: [],
        debuffs: [],
      },
    };

    this.wssService.sendMessage(gameInformation);

    this.store.select(selectIsEnemyCreated).subscribe((state) => {
      if (state) this.router.navigate(['/duels/game']);
    });
  }

  text = '';
}
