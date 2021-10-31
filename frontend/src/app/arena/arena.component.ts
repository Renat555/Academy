import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeEnemyHealth, changeUserHealth } from '../store/actions/arena.action';
import { selectEnemyHealth, selectUserHealth } from '../store/selectors/arena.selector';
import { AppState } from '../store/state/app.state';

function calcDirection(
  userTop: number,
  userLeft: number,
  clickTop: number,
  clickLeft: number
): string {
  
  if (clickTop <= userTop && clickLeft <= userLeft) {
    if (clickTop <= clickLeft) {
      return 'up';
    } else {
      return 'left';
    }
  } else if (clickTop <= userTop && clickLeft >= userLeft) {
    if (userTop - clickTop > clickLeft - userLeft) {
      return 'up';
    } else {
      return 'right';
    }
  } else if (clickTop >= userTop && clickLeft <= userLeft) {
    if (userLeft - clickLeft < clickTop - userTop) {
      return 'down';
    } else {
      return 'left';
    }
  } else if (clickTop >= userTop && clickLeft >= userLeft) {
      if (clickTop - userTop > clickLeft - userLeft) {
        return 'down';
      } else {
        return 'right';
      }
  } else {
    return 'down';
  }
}

function calcDegree(userTop: number,
  userLeft: number,
  clickTop: number,
  clickLeft: number) {
  let degree: number = 0;

  let userVector = [];

  userVector[0] = clickLeft - userLeft;
  userVector[1] = clickTop - userTop;

  let vectorLength = Math.sqrt(userVector[0]**2 + userVector[1]**2);

  let cosine = userVector[0]/vectorLength;

  let arccosine = Math.acos(cosine);

  degree = Math.round(arccosine/(Math.PI/180));
  
  if (userTop > clickTop) {
    degree = 180 - degree;
  } else {
    degree = 180 + degree;
  }
  
  return "rotate(" + degree + "deg)";
}

function calcTimeForUser(
  userLeft: number,
  userTop: number,
  clickLeft: number,
  clickTop: number
): number {
  let pathLength = Math.sqrt(
    (userLeft - clickLeft) ** 2 + (userTop - clickTop) ** 2
  );

  let time = Math.floor((pathLength / 300) * 100) / 100;

  return time;
}

function calcTimeForSpell(
  spellLeft: number,
  spellTop: number,
  clickLeft: number,
  clickTop: number
) {
  let pathLength = Math.sqrt(
    (spellLeft - clickLeft) ** 2 + (spellTop - clickTop) ** 2
  );

  let time = Math.floor((pathLength / 700) * 100) / 100;

  return time;
}

interface Coordinate {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.less'],
  animations: [
    trigger('moving', [
      state('first', style({ left: '{{left1}}px', top: '{{top1}}px' }), {
        params: { left1: 0, top1: 0 },
      }),
      state('second', style({ left: '{{left2}}px', top: '{{top2}}px' }), {
        params: { left2: 0, top2: 0 },
      }),
      transition('first => second', animate('{{time}}s')),
    ]),
    trigger('steps', [
      state(
        'backOne',
        style({ backgroundImage: 'url(../../assets/hero/c1.png)' })
      ),
      state(
        'backTwo',
        style({ backgroundImage: 'url(../../assets/hero/c2.png)' })
      ),
      state(
        'faceOne',
        style({ backgroundImage: 'url(../../assets/hero/c3.png)' })
      ),
      state(
        'faceTwo',
        style({ backgroundImage: 'url(../../assets/hero/c4.png)' })
      ),
      state(
        'leftOne',
        style({ backgroundImage: 'url(../../assets/hero/c5.png)' })
      ),
      state(
        'leftTwo',
        style({ backgroundImage: 'url(../../assets/hero/c6.png)' })
      ),
      state(
        'rightOne',
        style({ backgroundImage: 'url(../../assets/hero/c7.png)' })
      ),
      state(
        'rightTwo',
        style({ backgroundImage: 'url(../../assets/hero/c8.png)' })
      ),
    ]),
    trigger('spell', [
      state('first', style({left: '{{left3}}px', top: '{{top3}}px'}), {
        params: { left3: 0, top3: 0 },
      }),
      state('second', style({ left: '{{left4}}px', top: '{{top4}}px' }), {
        params: { left4: 0, top4: 0 },
      }),
      transition('first => second', animate('{{time2}}s')),
    ])
  ],
})
export class ArenaComponent {

  changeHealthComponent() {
    this.store.select(selectUserHealth).subscribe((health) => {
      this.userHealth = health + '%';
    });
    this.store.select(selectEnemyHealth).subscribe((health) => {
      this.enemyHealth = health + '%';
    });
  }

  userDamage() {
    this.store.dispatch(changeUserHealth({health: 90}));
    this.changeHealthComponent();
  }

  enemyDamage() {  
    this.store.dispatch(changeEnemyHealth({health: 90}));
    this.changeHealthComponent();
  }

  constructor(private store: Store<AppState>) {}

  userHealth: string = '100%';
  enemyHealth: string = '100%';

  isFireVisible: boolean = false;
  isSpellComplete: boolean = true;

  left1: number = 0;
  top1: number = 0;
  left2: number = 0;
  top2: number = 0;
  left3: number = 0;
  top3: number = 0;
  left4: number = 0;
  top4: number = 0;

  time: number = 1;
  time2: number = 2;

  timerId: any;

  degree: string = 'rotate(270deg)';

  stateMoving: string = '';
  stateSpell: string = '';
  stateSteps: string = '';

  @ViewChild('user') user!: ElementRef;

  castSpell(event: MouseEvent) {
    if (event.button != 2) return;
    event.preventDefault();

    if (!this.isSpellComplete) return;

    this.isSpellComplete = false;

    let target = event.target as HTMLElement;

    let user = this.user.nativeElement;
    let coord = user.getBoundingClientRect();

    this.left3 = coord.left;
    this.top3 = coord.top;

    this.stateSpell = 'first';

    this.left4 = event.clientX;
    this.top4 = event.clientY;  

    this.time2 = calcTimeForSpell(this.top3, this.left3, this.top4, this.left4);

    this.degree = calcDegree(this.top3, this.left3, this.top4, this.left4);
    
    let sound = new Audio('./../assets/audio/fire.mp3');
    sound.play();
    
    setTimeout(() => {
      this.stateSpell = 'second';
    }, 0);

    setTimeout(() => {
      this.isFireVisible = false;
      this.isSpellComplete = true;
      clearTimeout(id2);
    }, 500);

    let id2 = setTimeout(() => {
      this.isFireVisible = false;
    }, this.time2*1000);
    
    this.isFireVisible = true;
  }

  makeSteps(time: number, direction: string) {
    let toggle: boolean = true;

    let id = setInterval(() => {
      if (direction == 'up') {
        if (toggle) {
          this.stateSteps = 'backOne';
          toggle = false;
        } else {
          this.stateSteps = 'backTwo';
          toggle = true;
        }
      } else if (direction == 'right') {
        if (toggle) {
          this.stateSteps = 'rightOne';
          toggle = false;
        } else {
          this.stateSteps = 'rightTwo';
          toggle = true;
        }
      } else if (direction == 'down') {
        if (toggle) {
          this.stateSteps = 'faceOne';
          toggle = false;
        } else {
          this.stateSteps = 'faceTwo';
          toggle = true;
        }
      } else if (direction == 'left') {
        if (toggle) {
          this.stateSteps = 'leftOne';
          toggle = false;
        } else {
          this.stateSteps = 'leftTwo';
          toggle = true;
        }
      }
    }, 250);

    setTimeout(() => {
      clearInterval(id);
    }, time * 1000);

    return id;
  }

  setPoint(event: MouseEvent) {
    if (event.button != 0) return;

    let target = event.target as HTMLElement;

    if (target.dataset.way == 'obstacle') {
      return;
    }

    let user = this.user.nativeElement;
    let coord = user.getBoundingClientRect();

    this.left1 = coord.left;
    this.top1 = coord.top;

    this.stateMoving = 'first';

    this.left2 = event.clientX;
    this.top2 = event.clientY;

    this.time = calcTimeForUser(this.left1, this.top1, this.left2, this.top2);

    setTimeout(() => {
      this.stateMoving = 'second';
    }, 0);

    let direction: string = calcDirection(
      this.top1,
      this.left1,
      this.top2,
      this.left2
    );

    clearInterval(this.timerId);
    this.timerId = this.makeSteps(this.time, direction);
  }
}
