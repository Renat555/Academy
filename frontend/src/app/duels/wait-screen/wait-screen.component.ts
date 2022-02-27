import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEnemyType } from 'src/app/store/selectors/duels/generalInfo.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-wait-screen',
  templateUrl: './wait-screen.component.html',
  styleUrls: ['./wait-screen.component.less'],
})
export class WaitScreenComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private wssService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.store.select(selectEnemyType).subscribe((type) => {
      if (type === 'human') {
        this.text = 'Поиск противника...';
      } else {
        this.text = 'Создание игры...';
      }
    });

    this.wssService.sendMessage({
      header: 'createGame',
      user: {
        name: '',
        enemyType: '',
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
    });
  }

  text = '';
}
