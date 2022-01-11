import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllMap,
  selectMapEnemy,
  selectMapUser,
} from 'src/app/store/selectors/duels/map.selectors';
import { selectMuve } from 'src/app/store/selectors/duels/muve.selectors';
import { AppState } from 'src/app/store/state/app.state';

function isPathFree(
  map: string[][],
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
      transition('first => second', animate('{{userTime}}s')),
    ]),
    trigger('userSteps', [
      state(
        'backOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c1.png)',
        })
      ),
      state(
        'backTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c2.png)',
        })
      ),
      state(
        'faceOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c3.png)',
        })
      ),
      state(
        'faceTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c4.png)',
        })
      ),
      state(
        'leftOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c5.png)',
        })
      ),
      state(
        'leftTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c6.png)',
        })
      ),
      state(
        'rightOne',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c7.png)',
        })
      ),
      state(
        'rightTwo',
        style({
          backgroundImage: 'url(../../../../../assets/duels/user/c8.png)',
        })
      ),
    ]),
  ],
})
export class MapComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @ViewChild('user') user!: ElementRef;
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

  ngOnInit(): void {}

  isUserShown = false;
  isEnemyShown = false;

  userTop = '';
  userLeft = '';
  enemyTop = '';
  enemyLeft = '';

  stateUserMoving = '';
  userLeft1 = 0;
  userLeft2 = 0;
  userTop1 = 0;
  userTop2 = 0;
  userTime = 1;

  stateUserSteps = '';

  setTrajectory(event: MouseEvent) {
    let muve;

    this.store.select(selectMuve).subscribe((state) => {
      muve = state;
    });

    if (muve !== 'user') return;

    let target = event.target;

    if (typeof target !== 'object') return;

    let row = (target as HTMLElement).dataset.row;
    let col = (target as HTMLElement).dataset.col;

    if (!row || !col) return;

    let targetRow = +row;
    let targetCol = +col;

    let map;

    this.store.select(selectAllMap).subscribe((state) => {
      map = state;
    });

    if (!map) return;

    let user = { row: 0, col: 0 };

    this.store.select(selectMapUser).subscribe((state) => {
      user = state;
    });

    let userRow = user.row;
    let userCol = user.col;

    if (!isPathFree(map, userRow, userCol, targetRow, targetCol)) return;
  }

  placeUser() {
    this.store.select(selectMapUser).subscribe((state) => {
      let square = this.calculateSquare(state);
      let coord = square.getBoundingClientRect();
      this.userTop = coord.top + 5 + 'px';
      this.userLeft = coord.left + 5 + 'px';
      this.stateUserSteps = '';
      this.isUserShown = true;
      this.faceToEnemy();
    });
  }

  faceToEnemy() {
    let userCoord = { row: -1, col: -1 };
    let enemyCoord = { row: -1, col: -1 };

    this.store.select(selectMapUser).subscribe((state) => {
      userCoord = state;
    });

    this.store.select(selectMapEnemy).subscribe((state) => {
      enemyCoord = state;
    });

    if (userCoord.row < enemyCoord.row) {
      this.stateUserSteps = 'backOne';
    } else if (userCoord.row > enemyCoord.row) {
      this.stateUserSteps = 'faceOne';
    } else if (userCoord.col < enemyCoord.col) {
      this.stateUserSteps = 'rightOne';
    } else if (userCoord.col > enemyCoord.col) {
      this.stateUserSteps = 'leftOne';
    }
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
    }

    return square;
  }
}
