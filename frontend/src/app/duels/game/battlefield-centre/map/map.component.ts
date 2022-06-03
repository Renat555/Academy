import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deletePreparedSpells,
  setUser,
  spellPreparing,
} from 'src/app/store/actions/duels/map.actions';
import { changeUserActionPoints } from 'src/app/store/actions/duels/users.actions';
import {
  selectAllMap,
  selectMapEnemy,
  selectMapUser,
} from 'src/app/store/selectors/duels/map.selectors';
import { selectMuve } from 'src/app/store/selectors/duels/generalInfo.selectors';
import { selectUserActionPoints } from 'src/app/store/selectors/duels/users.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { WebsocketService } from 'src/app/services/websocket.service';
import {
  selectForm,
  selectSpell,
} from 'src/app/store/selectors/duels/currentSpell.selectors';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { addBattlefieldSpell } from 'src/app/store/actions/duels/currentSpell.actions';
import { ThisReceiver } from '@angular/compiler';
import { pendingTrue } from 'src/app/store/actions/pending.actions';
import { selectSpellbook } from 'src/app/store/selectors/duels/spellbook.selectors';
import { SpellbookState } from 'src/app/store/reducers/duels/spellBook.reducer';

function isPathFree(
  map: any,
  userRow: number,
  userCol: number,
  targetRow: number,
  targetCol: number
): boolean {
  if (userRow < targetRow) {
    userRow++;
    if (map[userRow][userCol][0] === 'block') return false;
  } else if (userRow > targetRow) {
    userRow--;
    if (map[userRow][userCol][0] === 'block') return false;
  } else if (userCol > targetCol) {
    userCol--;
    if (map[userRow][userCol][0] === 'block') return false;
  } else if (userCol < targetCol) {
    userCol++;
    if (map[userRow][userCol][0] === 'block') return false;
  }

  if (userRow === targetRow && userCol === targetCol) {
    return true;
  } else {
    return isPathFree(map, userRow, userCol, targetRow, targetCol);
  }
}

function calcTimeMoving(firstPoint: number, secondPoint: number) {
  let pathLength = Math.abs(firstPoint - secondPoint);

  let time = Math.floor((pathLength / 200) * 100) / 100;

  return time;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
  animations: [
    trigger('userMoving', [
      state(
        'first',
        style({ left: '{{userLeft1}}px', top: '{{userTop1}}px' }),
        {
          params: { userLeft1: 0, userTop1: 0 },
        }
      ),
      state(
        'second',
        style({ left: '{{userLeft2}}px', top: '{{userTop2}}px' }),
        {
          params: { userLeft2: 0, userTop2: 0 },
        }
      ),
      state(
        'third',
        style({ left: '{{userLeft3}}px', top: '{{userTop3}}px' }),
        {
          params: { userLeft3: 0, userTop3: 0 },
        }
      ),
      transition('first => second', animate('{{userTimeVertical}}s')),
      transition('second => third', animate('{{userTimeHorizontal}}s')),
    ]),
    trigger('enemyMoving', [
      state(
        'first',
        style({ left: '{{enemyLeft1}}px', top: '{{enemyTop1}}px' }),
        {
          params: { enemyLeft1: 0, enemyTop1: 0 },
        }
      ),
      state(
        'second',
        style({ left: '{{enemyLeft2}}px', top: '{{enemyTop2}}px' }),
        {
          params: { enemyLeft2: 0, enemyTop2: 0 },
        }
      ),
      state(
        'third',
        style({ left: '{{enemyLeft3}}px', top: '{{enemyTop3}}px' }),
        {
          params: { enemyLeft3: 0, enemyTop3: 0 },
        }
      ),
      transition('first => second', animate('{{enemyTimeVertical}}s')),
      transition('second => third', animate('{{enemyTimeHorizontal}}s')),
    ]),
    trigger('userSteps', [
      state(
        'userBackOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c1.png)',
        })
      ),
      state(
        'userBackTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c2.png)',
        })
      ),
      state(
        'userFaceOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c3.png)',
        })
      ),
      state(
        'userFaceTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c4.png)',
        })
      ),
      state(
        'userLeftOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c5.png)',
        })
      ),
      state(
        'userLeftTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c6.png)',
        })
      ),
      state(
        'userRightOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c7.png)',
        })
      ),
      state(
        'userRightTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c8.png)',
        })
      ),
    ]),
    trigger('enemySteps', [
      state(
        'enemyBackOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a1.png)',
        })
      ),
      state(
        'enemyBackTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a2.png)',
        })
      ),
      state(
        'enemyFaceOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a3.png)',
        })
      ),
      state(
        'enemyFaceTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a4.png)',
        })
      ),
      state(
        'enemyLeftOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a5.png)',
        })
      ),
      state(
        'enemyLeftTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/a6.png)',
        })
      ),
      state(
        'enemyRightOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a7.png)',
        })
      ),
      state(
        'enemyRightTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/enemy/a8.png)',
        })
      ),
    ]),
  ],
})
export class MapComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private wssService: WebsocketService
  ) {}

  @ViewChild('battlefield') battlefield!: ElementRef;
  @ViewChild('user') user!: ElementRef;
  @ViewChild('enemy') enemy!: ElementRef;
  @ViewChild('r0c6') r0c6!: ElementRef;
  @ViewChild('r0c5') r0c5!: ElementRef;
  @ViewChild('r0c4') r0c4!: ElementRef;
  @ViewChild('r0c3') r0c3!: ElementRef;
  @ViewChild('r0c2') r0c2!: ElementRef;
  @ViewChild('r0c1') r0c1!: ElementRef;
  @ViewChild('r0c0') r0c0!: ElementRef;
  @ViewChild('r1c6') r1c6!: ElementRef;
  @ViewChild('r1c5') r1c5!: ElementRef;
  @ViewChild('r1c4') r1c4!: ElementRef;
  @ViewChild('r1c3') r1c3!: ElementRef;
  @ViewChild('r1c2') r1c2!: ElementRef;
  @ViewChild('r1c1') r1c1!: ElementRef;
  @ViewChild('r1c0') r1c0!: ElementRef;
  @ViewChild('r2c6') r2c6!: ElementRef;
  @ViewChild('r2c5') r2c5!: ElementRef;
  @ViewChild('r2c4') r2c4!: ElementRef;
  @ViewChild('r2c3') r2c3!: ElementRef;
  @ViewChild('r2c2') r2c2!: ElementRef;
  @ViewChild('r2c1') r2c1!: ElementRef;
  @ViewChild('r2c0') r2c0!: ElementRef;
  @ViewChild('r3c6') r3c6!: ElementRef;
  @ViewChild('r3c5') r3c5!: ElementRef;
  @ViewChild('r3c4') r3c4!: ElementRef;
  @ViewChild('r3c3') r3c3!: ElementRef;
  @ViewChild('r3c2') r3c2!: ElementRef;
  @ViewChild('r3c1') r3c1!: ElementRef;
  @ViewChild('r3c0') r3c0!: ElementRef;
  @ViewChild('r4c6') r4c6!: ElementRef;
  @ViewChild('r4c5') r4c5!: ElementRef;
  @ViewChild('r4c4') r4c4!: ElementRef;
  @ViewChild('r4c3') r4c3!: ElementRef;
  @ViewChild('r4c2') r4c2!: ElementRef;
  @ViewChild('r4c1') r4c1!: ElementRef;
  @ViewChild('r4c0') r4c0!: ElementRef;
  @ViewChild('r5c6') r5c6!: ElementRef;
  @ViewChild('r5c5') r5c5!: ElementRef;
  @ViewChild('r5c4') r5c4!: ElementRef;
  @ViewChild('r5c3') r5c3!: ElementRef;
  @ViewChild('r5c2') r5c2!: ElementRef;
  @ViewChild('r5c1') r5c1!: ElementRef;
  @ViewChild('r5c0') r5c0!: ElementRef;
  @ViewChild('r6c6') r6c6!: ElementRef;
  @ViewChild('r6c5') r6c5!: ElementRef;
  @ViewChild('r6c4') r6c4!: ElementRef;
  @ViewChild('r6c3') r6c3!: ElementRef;
  @ViewChild('r6c2') r6c2!: ElementRef;
  @ViewChild('r6c1') r6c1!: ElementRef;
  @ViewChild('r6c0') r6c0!: ElementRef;

  userTop = '';
  userLeft = '';
  enemyTop = '';
  enemyLeft = '';

  stateUserMoving = '';
  userLeft1 = 0;
  userLeft2 = 0;
  userLeft3 = 0;
  userTop1 = 0;
  userTop2 = 0;
  userTop3 = 0;
  userTimeVertical = 1;
  userTimeHorizontal = 1;

  stateEnemyMoving = '';
  enemyLeft1 = 0;
  enemyLeft2 = 0;
  enemyLeft3 = 0;
  enemyTop1 = 0;
  enemyTop2 = 0;
  enemyTop3 = 0;
  enemyTimeVertical = 1;
  enemyTimeHorizontal = 1;

  stateUserSteps = '';
  stateEnemySteps = '';

  isHintHidden = true;
  hintTop = '0px';
  hintLeft = '0px';
  battlefieldDescription = '';

  spellBook: SpellbookState = {};

  map: (string | number)[][][] = [];
  userMapCoord = { row: 0, col: 0 };
  enemyMapCoord = { row: 0, col: 0 };

  mapSubscription = new Subscription();
  currentSpellSubscription = new Subscription();
  enemyMapSubscription = new Subscription();
  spellBookSubscription = new Subscription();
  moveSubscription = new Subscription();
  mapUserSubscription = new Subscription();
  mapEnemySubscription = new Subscription();

  ngOnInit(): void {
    setTimeout(() => {
      this.mapSubscription = this.store
        .select(selectAllMap)
        .subscribe((state) => {
          this.map = state;
          this.setBattlefieldSpells();
        });

      this.currentSpellSubscription = this.store
        .select(selectSpell)
        .subscribe((spell) => {
          if (spell === 'earthshield') {
            this.battlefield.nativeElement.removeEventListener(
              'click',
              this.moveUserBind
            );
            this.createEarthshield();
          } else if (spell === 'watersphere') {
            this.battlefield.nativeElement.removeEventListener(
              'click',
              this.moveUserBind
            );
            this.createWatersphere();
          } else {
            this.battlefield.nativeElement.addEventListener(
              'click',
              this.moveUserBind
            );
            this.cancelEarthshield();
          }
        });

      this.placeUser();
      this.placeEnemy();

      this.battlefield.nativeElement.addEventListener(
        'mouseover',
        (e: MouseEvent) => this.showHint(e)
      );

      this.enemyMapSubscription = this.store
        .select(selectMapEnemy)
        .subscribe((coord) => {
          this.enemyMapCoord = coord;
          this.moveEnemy;
        });

      this.mapUserSubscription = this.store
        .select(selectMapUser)
        .subscribe((state) => {
          this.userMapCoord = state;
        });

      this.spellBookSubscription = this.store
        .select(selectSpellbook)
        .subscribe((state) => {
          this.spellBook = state;
        });
    }, 0);
  }

  setBattlefieldSpells() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        let square = this.calculateSquare({ row: i, col: j });
        if (this.map[i][j][4] === 'prepared') {
          square.classList.add(this.map[i][j][2]);
          square.style.opacity = '0.7';
        } else if (this.map[i][j][4] === 'approved') {
          square.classList.add(this.map[i][j][2]);
          square.style.opacity = '1';
        } else {
          square.className = 'battleSquare';
          square.style.opacity = '1';
        }
      }
    }
  }

  moveUserBind = this.moveUser.bind(this);

  createEarthshield() {
    let battlefield = this.battlefield.nativeElement;
    battlefield.addEventListener('mouseover', this.placeEarthShieldBind);
    battlefield.addEventListener('click', this.cancelEarthshieldBind);
  }

  placeEarthShieldBind = this.placeEarthShield.bind(this);

  placeEarthShield(event: MouseEvent) {
    let target = event.target as HTMLElement;

    if (!target.classList.contains('battleSquare')) return;

    let middleSquare = event.target as HTMLElement;

    if (
      !this.isBlockFreeForMove(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col!
      )
    )
      return;

    if (
      !this.isBlockFreeForSpell(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col!
      )
    )
      return;

    this.store.dispatch(deletePreparedSpells());

    let coord = [];

    coord.push([+middleSquare.dataset.row!, +middleSquare.dataset.col!]);

    let leftSquare = this.calculateSquare({
      row: +middleSquare.dataset.row!,
      col: +middleSquare.dataset.col! - 1,
    });
    if (
      leftSquare &&
      this.isBlockFreeForMove(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col! - 1
      ) &&
      this.isBlockFreeForSpell(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col! - 1
      )
    ) {
      coord.push([+middleSquare.dataset.row!, +middleSquare.dataset.col! - 1]);
    }

    let rightSquare = this.calculateSquare({
      row: +middleSquare.dataset.row!,
      col: +middleSquare.dataset.col! + 1,
    });
    if (
      rightSquare &&
      this.isBlockFreeForMove(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col! + 1
      ) &&
      this.isBlockFreeForSpell(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col! + 1
      )
    ) {
      coord.push([+middleSquare.dataset.row!, +middleSquare.dataset.col! + 1]);
    }

    this.store.dispatch(
      spellPreparing({ spell: 'earthshield', coordinates: coord })
    );

    this.store.dispatch(
      addBattlefieldSpell({
        battlefieldSpell: 'earthshield',
        coordinates: coord,
      })
    );
  }

  cancelEarthshieldBind = this.cancelEarthshield.bind(this);

  cancelEarthshield() {
    let battlefield = this.battlefield.nativeElement;
    battlefield.removeEventListener('mouseover', this.placeEarthShieldBind);
    battlefield.addEventListener('click', this.moveUserBind);
  }

  createWatersphere() {
    let battlefield = this.battlefield.nativeElement;
    battlefield.addEventListener('mouseover', this.placeWatersphereBind);
    battlefield.addEventListener('click', this.cancelWatersphereBind);
  }

  placeWatersphereBind = this.placeWatersphere.bind(this);

  placeWatersphere(event: MouseEvent) {
    let target = event.target as HTMLElement;

    if (!target.classList.contains('battleSquare')) return;

    let middleSquare = event.target as HTMLElement;

    if (
      !this.isBlockFreeForSpell(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col!
      )
    )
      return;

    this.store.dispatch(deletePreparedSpells());

    let coord = [];

    coord.push([+middleSquare.dataset.row!, +middleSquare.dataset.col!]);

    let underSquare = this.calculateSquare({
      row: +middleSquare.dataset.row! - 1,
      col: +middleSquare.dataset.col!,
    });
    if (
      underSquare &&
      this.isBlockFreeForSpell(
        +middleSquare.dataset.row! - 1,
        +middleSquare.dataset.col!
      )
    ) {
      coord.push([+middleSquare.dataset.row! - 1, +middleSquare.dataset.col!]);
    }

    let rightSquare = this.calculateSquare({
      row: +middleSquare.dataset.row!,
      col: +middleSquare.dataset.col! + 1,
    });
    if (
      rightSquare &&
      this.isBlockFreeForSpell(
        +middleSquare.dataset.row!,
        +middleSquare.dataset.col! + 1
      )
    ) {
      coord.push([+middleSquare.dataset.row!, +middleSquare.dataset.col! + 1]);
    }

    let underRightSquare = this.calculateSquare({
      row: +middleSquare.dataset.row! - 1,
      col: +middleSquare.dataset.col! + 1,
    });
    if (
      underRightSquare &&
      this.isBlockFreeForSpell(
        +middleSquare.dataset.row! - 1,
        +middleSquare.dataset.col! + 1
      )
    ) {
      coord.push([
        +middleSquare.dataset.row! - 1,
        +middleSquare.dataset.col! + 1,
      ]);
    }

    this.store.dispatch(
      spellPreparing({ spell: 'watersphere', coordinates: coord })
    );

    this.store.dispatch(
      addBattlefieldSpell({
        battlefieldSpell: 'watersphere',
        coordinates: coord,
      })
    );
  }

  cancelWatersphereBind = this.cancelWatersphere.bind(this);

  cancelWatersphere() {
    let battlefield = this.battlefield.nativeElement;
    battlefield.removeEventListener('mouseover', this.placeWatersphereBind);
    battlefield.addEventListener('click', this.moveUserBind);
  }

  isUserMove() {
    let move;
    this.moveSubscription = this.store.select(selectMuve).subscribe((state) => {
      move = state;
    });
    if (move !== 'user') return false;
    return true;
  }

  userMoveAnimation() {
    setTimeout(() => {
      this.stateUserMoving = 'second';

      let direction;

      if (this.userTop1 < this.userTop2) {
        direction = 'down';
      } else {
        direction = 'up';
      }
      this.makeUserSteps(this.userTimeVertical, direction);
      setTimeout(() => {
        this.stateUserMoving = 'third';

        let direction;

        if (this.userLeft2 < this.userLeft3) {
          direction = 'right';
        } else {
          direction = 'left';
        }
        this.makeUserSteps(this.userTimeHorizontal, direction);

        setTimeout(() => {
          this.faceToEnemy();
        }, this.userTimeHorizontal * 1020);
      }, this.userTimeVertical * 1020);
    }, 0);
  }

  moveUser(event: MouseEvent) {
    if (!this.isUserMove()) return;

    let target = event.target as HTMLElement;

    let row = target.dataset.row;
    let col = target.dataset.col;

    if (!row || !col) return;

    let targetRow = +row;
    let targetCol = +col;

    let userRow = this.userMapCoord.row;
    let userCol = this.userMapCoord.col;

    let pathData = this.getPathData(
      this.map,
      userRow,
      userCol,
      targetRow,
      targetCol
    );

    let pathSquares = this.getPathSquares(
      userRow,
      userCol,
      targetRow,
      targetCol
    );

    let actionPoints = 0;

    this.store.select(selectUserActionPoints).subscribe((state) => {
      actionPoints = state;
    });

    if (pathData.length > actionPoints) return;

    if (!isPathFree(this.map, userRow, userCol, targetRow, targetCol)) return;

    let trajectory = this.getTrajectory(userRow, userCol, targetRow, targetCol);

    this.wssService.sendMessage({
      header: 'playerMovement',
      trajectory: trajectory,
    });

    let verticalSquare = this.calculateSquare({
      row: targetRow,
      col: userCol,
    });

    let verticalSquareCoord = verticalSquare.getBoundingClientRect();

    let userCoord = this.user.nativeElement.getBoundingClientRect();

    this.userLeft1 = userCoord.left + window.pageXOffset;
    this.userTop1 = userCoord.top + window.pageYOffset;

    this.stateUserMoving = 'first';

    this.userLeft2 = verticalSquareCoord.left + 5 + window.pageXOffset;
    this.userTop2 = verticalSquareCoord.top + 5 + window.pageYOffset;

    let targetCoord = target.getBoundingClientRect();

    this.userLeft3 = targetCoord.left + 5 + window.pageXOffset;
    this.userTop3 = targetCoord.top;

    this.userTimeVertical = calcTimeMoving(this.userTop1, this.userTop2);
    this.userTimeHorizontal = calcTimeMoving(this.userLeft2, this.userLeft3);

    this.store.dispatch(setUser({ row: targetRow, col: targetCol }));

    this.userMoveAnimation();
  }

  makeUserSteps(time: number, direction: string) {
    let toggle: boolean = true;

    let id = setInterval(() => {
      if (direction == 'up') {
        if (toggle) {
          this.stateUserSteps = 'userBackOne';
          toggle = false;
        } else {
          this.stateUserSteps = 'userBackTwo';
          toggle = true;
        }
      } else if (direction == 'right') {
        if (toggle) {
          this.stateUserSteps = 'userRightOne';
          toggle = false;
        } else {
          this.stateUserSteps = 'userRightTwo';
          toggle = true;
        }
      } else if (direction == 'down') {
        if (toggle) {
          this.stateUserSteps = 'userFaceOne';
          toggle = false;
        } else {
          this.stateUserSteps = 'userFaceTwo';
          toggle = true;
        }
      } else if (direction == 'left') {
        if (toggle) {
          this.stateUserSteps = 'userLeftOne';
          toggle = false;
        } else {
          this.stateUserSteps = 'userLeftTwo';
          toggle = true;
        }
      }
    }, 250);

    setTimeout(() => {
      clearInterval(id);
    }, time * 1000);

    return id;
  }

  moveEnemy(coord: { row: number; col: number }) {
    let target = this.calculateSquare(coord);

    let enemyCoord = this.enemy.nativeElement.getBoundingClientRect();

    this.enemyLeft1 = enemyCoord.left + window.pageXOffset;
    this.enemyTop1 = enemyCoord.top + window.pageYOffset;

    this.stateEnemyMoving = 'first';

    let targetCoord = target.getBoundingClientRect();

    this.enemyLeft2 = this.enemyLeft1 + window.pageXOffset;
    this.enemyTop2 = targetCoord.top + window.pageYOffset;

    this.enemyLeft3 = targetCoord.left + window.pageXOffset + 5;
    this.enemyTop3 = this.enemyTop2;

    this.enemyTimeVertical = calcTimeMoving(this.enemyTop1, this.enemyTop2);
    this.enemyTimeHorizontal = calcTimeMoving(this.enemyLeft2, this.enemyLeft3);

    setTimeout(() => {
      this.stateEnemyMoving = 'second';

      let direction;

      if (this.enemyTop1 < this.enemyTop2) {
        direction = 'down';
      } else {
        direction = 'up';
      }
      this.makeEnemySteps(this.enemyTimeVertical, direction);
      setTimeout(() => {
        this.stateEnemyMoving = 'third';

        let direction;

        if (this.enemyLeft2 < this.enemyLeft3) {
          direction = 'right';
        } else {
          direction = 'left';
        }
        this.makeEnemySteps(this.enemyTimeHorizontal, direction);

        setTimeout(() => {
          this.faceToEnemy();
        }, this.enemyTimeHorizontal * 1020);
      }, this.enemyTimeVertical * 1020);
    }, 0);
  }

  makeEnemySteps(time: number, direction: string) {
    let toggle: boolean = true;

    let id = setInterval(() => {
      if (direction == 'up') {
        if (toggle) {
          this.stateEnemySteps = 'enemyBackOne';
          toggle = false;
        } else {
          this.stateEnemySteps = 'enemyBackTwo';
          toggle = true;
        }
      } else if (direction == 'right') {
        if (toggle) {
          this.stateEnemySteps = 'enemyRightOne';
          toggle = false;
        } else {
          this.stateEnemySteps = 'enemyRightTwo';
          toggle = true;
        }
      } else if (direction == 'down') {
        if (toggle) {
          this.stateEnemySteps = 'enemyFaceOne';
          toggle = false;
        } else {
          this.stateEnemySteps = 'enemyFaceTwo';
          toggle = true;
        }
      } else if (direction == 'left') {
        if (toggle) {
          this.stateEnemySteps = 'enemyLeftOne';
          toggle = false;
        } else {
          this.stateEnemySteps = 'enemyLeftTwo';
          toggle = true;
        }
      }
    }, 250);

    setTimeout(() => {
      clearInterval(id);
    }, time * 1000);

    return id;
  }

  getPathData(
    map: (string | number)[][][],
    userRow: number,
    userCol: number,
    targetRow: number,
    targetCol: number
  ) {
    let result = [];
    while (userRow !== targetRow || userCol !== targetCol) {
      if (userRow < targetRow) {
        userRow++;
        result.push(map[userRow][userCol]);
      } else if (userRow > targetRow) {
        userRow--;
        result.push(map[userRow][userCol]);
      } else if (userCol > targetCol) {
        userCol--;
        result.push(map[userRow][userCol]);
      } else if (userCol < targetCol) {
        userCol++;
        result.push(map[userRow][userCol]);
      }
    }
    return result;
  }

  getPathSquares(
    userRow: number,
    userCol: number,
    targetRow: number,
    targetCol: number
  ) {
    let result = [];
    while (userRow !== targetRow || userCol !== targetCol) {
      if (userRow < targetRow) {
        userRow++;
        result.push(this.calculateSquare({ row: userRow, col: userCol }));
      } else if (userRow > targetRow) {
        userRow--;
        result.push(this.calculateSquare({ row: userRow, col: userCol }));
      } else if (userCol > targetCol) {
        userCol--;
        result.push(this.calculateSquare({ row: userRow, col: userCol }));
      } else if (userCol < targetCol) {
        userCol++;
        result.push(this.calculateSquare({ row: userRow, col: userCol }));
      }
    }
    return result;
  }

  getTrajectory(
    userRow: number,
    userCol: number,
    targetRow: number,
    targetCol: number
  ) {
    let trajectory = [];

    while (userRow !== targetRow || userCol !== targetCol) {
      if (userRow < targetRow) {
        userRow++;
        trajectory.push([userRow, userCol]);
      } else if (userRow > targetRow) {
        userRow--;
        trajectory.push([userRow, userCol]);
      } else if (userCol > targetCol) {
        userCol--;
        trajectory.push([userRow, userCol]);
      } else if (userCol < targetCol) {
        userCol++;
        trajectory.push([userRow, userCol]);
      }
    }

    return trajectory;
  }

  placeUser() {
    let square = this.calculateSquare({ row: 0, col: 3 });
    let coord = square.getBoundingClientRect();
    this.userTop = coord.top + window.pageYOffset + 5 + 'px';
    this.userLeft = coord.left + 5 + 'px';
    this.stateUserSteps = 'userBackOne';
  }

  placeEnemy() {
    let square = this.calculateSquare({ row: 6, col: 3 });
    let coord = square.getBoundingClientRect();
    this.enemyTop = coord.top + window.pageYOffset + 5 + 'px';
    this.enemyLeft = coord.left + 5 + 'px';
    this.stateEnemySteps = 'enemyFaceOne';
  }

  faceToEnemy() {
    if (this.userMapCoord.row < this.enemyMapCoord.row) {
      this.stateUserSteps = 'userBackOne';
      this.stateEnemySteps = 'enemyFaceOne';
    } else if (this.userMapCoord.row > this.enemyMapCoord.row) {
      this.stateUserSteps = 'userFaceOne';
      this.stateEnemySteps = 'enemyBackOne';
    } else if (this.userMapCoord.col < this.enemyMapCoord.col) {
      this.stateUserSteps = 'userRightOne';
      this.stateEnemySteps = 'enemyLeftOne';
    } else if (this.userMapCoord.col > this.enemyMapCoord.col) {
      this.stateUserSteps = 'userLeftOne';
      this.stateEnemySteps = 'enemyRightOne';
    }
  }

  showHint(event: any) {
    let target = event.target;

    if (!target.classList.contains('battleSquare')) return;

    let row = +target.dataset.row;
    let col = +target.dataset.col;

    if (this.map[row][col][2] === '' || this.map[row][col][4] === 'prepared') {
      this.isHintHidden = true;
    } else {
      this.isHintHidden = false;

      this.battlefieldDescription =
        this.spellBook[this.map[row][col][2]]['description'] +
        'Осталось ходов ' +
        this.map[row][col][3];
    }

    let coordSquare = target.getBoundingClientRect();

    this.hintLeft =
      coordSquare.left +
      coordSquare.width / 2 -
      250 +
      window.pageXOffset +
      'px';
    this.hintTop =
      coordSquare.top + coordSquare.height + window.pageYOffset + 'px';
  }

  calculateSquare(coord: { row: number; col: number }) {
    let square;

    let coordShort = '' + coord.row + coord.col;

    switch (coordShort) {
      case '00':
        square = this.r0c0.nativeElement;
        break;
      case '01':
        square = this.r0c1.nativeElement;
        break;
      case '02':
        square = this.r0c2.nativeElement;
        break;
      case '03':
        square = this.r0c3.nativeElement;
        break;
      case '04':
        square = this.r0c4.nativeElement;
        break;
      case '05':
        square = this.r0c5.nativeElement;
        break;
      case '06':
        square = this.r0c6.nativeElement;
        break;
      case '10':
        square = this.r1c0.nativeElement;
        break;
      case '11':
        square = this.r1c1.nativeElement;
        break;
      case '12':
        square = this.r1c2.nativeElement;
        break;
      case '13':
        square = this.r1c3.nativeElement;
        break;
      case '14':
        square = this.r1c4.nativeElement;
        break;
      case '15':
        square = this.r1c5.nativeElement;
        break;
      case '16':
        square = this.r1c6.nativeElement;
        break;
      case '20':
        square = this.r2c0.nativeElement;
        break;
      case '21':
        square = this.r2c1.nativeElement;
        break;
      case '22':
        square = this.r2c2.nativeElement;
        break;
      case '23':
        square = this.r2c3.nativeElement;
        break;
      case '24':
        square = this.r2c4.nativeElement;
        break;
      case '25':
        square = this.r2c5.nativeElement;
        break;
      case '26':
        square = this.r2c6.nativeElement;
        break;
      case '30':
        square = this.r3c0.nativeElement;
        break;
      case '31':
        square = this.r3c1.nativeElement;
        break;
      case '32':
        square = this.r3c2.nativeElement;
        break;
      case '33':
        square = this.r3c3.nativeElement;
        break;
      case '34':
        square = this.r3c4.nativeElement;
        break;
      case '35':
        square = this.r3c5.nativeElement;
        break;
      case '36':
        square = this.r3c6.nativeElement;
        break;
      case '40':
        square = this.r4c0.nativeElement;
        break;
      case '41':
        square = this.r4c1.nativeElement;
        break;
      case '42':
        square = this.r4c2.nativeElement;
        break;
      case '43':
        square = this.r4c3.nativeElement;
        break;
      case '44':
        square = this.r4c4.nativeElement;
        break;
      case '45':
        square = this.r4c5.nativeElement;
        break;
      case '46':
        square = this.r4c6.nativeElement;
        break;
      case '50':
        square = this.r5c0.nativeElement;
        break;
      case '51':
        square = this.r5c1.nativeElement;
        break;
      case '52':
        square = this.r5c2.nativeElement;
        break;
      case '53':
        square = this.r5c3.nativeElement;
        break;
      case '54':
        square = this.r5c4.nativeElement;
        break;
      case '55':
        square = this.r5c5.nativeElement;
        break;
      case '56':
        square = this.r5c6.nativeElement;
        break;
      case '60':
        square = this.r6c0.nativeElement;
        break;
      case '61':
        square = this.r6c1.nativeElement;
        break;
      case '62':
        square = this.r6c2.nativeElement;
        break;
      case '63':
        square = this.r6c3.nativeElement;
        break;
      case '64':
        square = this.r6c4.nativeElement;
        break;
      case '65':
        square = this.r6c5.nativeElement;
        break;
      case '66':
        square = this.r6c6.nativeElement;
        break;
    }

    return square;
  }

  isBlockFreeForMove(row: number, col: number) {
    if (this.map[row][col][0] === 'block') return false;
    return true;
  }

  isBlockFreeForSpell(row: number, col: number) {
    if (this.map[row][col][2] === '') return true;
    return false;
  }

  ngOnDestroy(): void {
    this.currentSpellSubscription.unsubscribe();
    this.mapSubscription.unsubscribe();
    this.enemyMapSubscription.unsubscribe();
    this.spellBookSubscription.unsubscribe();
    this.moveSubscription.unsubscribe();
  }
}
