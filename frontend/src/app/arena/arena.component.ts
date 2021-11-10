import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  decreaseEnemyHealth,
  decreaseUserHealth,
} from '../store/actions/arena.action';
import {
  selectEnemyHealth,
  selectUserHealth,
} from '../store/selectors/arena.selector';
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

function calcDegree(
  userTop: number,
  userLeft: number,
  clickTop: number,
  clickLeft: number
) {
  let degree: number = 0;

  let userVector = [];

  userVector[0] = clickLeft - userLeft;
  userVector[1] = clickTop - userTop;

  let vectorLength = Math.sqrt(userVector[0] ** 2 + userVector[1] ** 2);

  let cosine = userVector[0] / vectorLength;

  let arccosine = Math.acos(cosine);

  degree = Math.round(arccosine / (Math.PI / 180));

  if (userTop > clickTop) {
    degree = 180 - degree;
  } else {
    degree = 180 + degree;
  }

  return 'rotate(' + degree + 'deg)';
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
      state('first', style({ left: '{{left3}}px', top: '{{top3}}px' }), {
        params: { left3: 0, top3: 0 },
      }),
      state('second', style({ left: '{{left4}}px', top: '{{top4}}px' }), {
        params: { left4: 0, top4: 0 },
      }),
      transition('first => second', animate('{{time2}}s')),
    ]),
    trigger('spellEnemyOne', [
      state('first', style({ left: '{{left5}}px', top: '{{top5}}px' }), {
        params: { left5: 0, top5: 0 },
      }),
      state('second', style({ left: '{{left6}}px', top: '{{top6}}px' }), {
        params: { left6: 0, top6: 0 },
      }),
      transition('first => second', animate('{{time3}}s')),
    ]),
    trigger('spellEnemyTwo', [
      state('first', style({ left: '{{left5}}px', top: '{{top5}}px' }), {
        params: { left5: 0, top5: 0 },
      }),
      state('second', style({ left: '{{left7}}px', top: '{{top7}}px' }), {
        params: { left7: 0, top7: 0 },
      }),
      transition('first => second', animate('{{time3}}s')),
    ]),
    trigger('spellEnemyThree', [
      state('first', style({ left: '{{left5}}px', top: '{{top5}}px' }), {
        params: { left5: 0, top5: 0 },
      }),
      state('second', style({ left: '{{left8}}px', top: '{{top8}}px' }), {
        params: { left8: 0, top8: 0 },
      }),
      transition('first => second', animate('{{time3}}s')),
    ]),
    trigger('spellEnemyFour', [
      state('first', style({ left: '{{left5}}px', top: '{{top5}}px' }), {
        params: { left5: 0, top5: 0 },
      }),
      state('second', style({ left: '{{left9}}px', top: '{{top9}}px' }), {
        params: { left9: 0, top9: 0 },
      }),
      transition('first => second', animate('{{time3}}s')),
    ]),
  ],
})
export class ArenaComponent implements OnDestroy, AfterViewInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.castEnemeySpells();
    }, 0);

    this.castingEnemySpells();
    this.enemyDamageTracking();
    this.userDamageTrecking();
  }

  ngOnDestroy() {
    clearInterval(this.enemySpellsTimerId);
    clearInterval(this.enemyDamageTrackingId);
    clearInterval(this.userDamageTrackingId);
  }

  enemyDamageTracking() {
    this.enemyDamageTrackingId = setInterval(() => {
      if (!this.fireball) return;

      let enemy = this.enemy.nativeElement.getBoundingClientRect();
      let fireball = this.fireball.nativeElement.getBoundingClientRect();

      if (
        (fireball.bottom > enemy.top &&
          fireball.bottom < enemy.bottom &&
          fireball.right > enemy.left &&
          fireball.right < enemy.right) ||
        (fireball.bottom > enemy.top &&
          fireball.bottom < enemy.bottom &&
          fireball.left > enemy.left &&
          fireball.left < enemy.right) ||
        (fireball.top > enemy.top &&
          fireball.top < enemy.bottom &&
          fireball.left > enemy.left &&
          fireball.left < enemy.right) ||
        (fireball.top > enemy.top &&
          fireball.top < enemy.bottom &&
          fireball.right > enemy.left &&
          fireball.right < enemy.right)
      ) {
        this.enemyDamage(5);
      }
    }, 200);
  }

  userDamageTrecking() {
    this.userDamageTrackingId = setInterval(() => {
      if (!this.energy1 || !this.energy2 || !this.energy3 || !this.energy4)
        return;

      let user = this.user.nativeElement.getBoundingClientRect();
      let energy1 = this.energy1.nativeElement.getBoundingClientRect();
      let energy2 = this.energy2.nativeElement.getBoundingClientRect();
      let energy3 = this.energy3.nativeElement.getBoundingClientRect();
      let energy4 = this.energy4.nativeElement.getBoundingClientRect();

      if (
        (energy1.bottom > user.top &&
          energy1.bottom < user.bottom &&
          energy1.right > user.left &&
          energy1.right < user.right) ||
        (energy1.bottom > user.top &&
          energy1.bottom < user.bottom &&
          energy1.left > user.left &&
          energy1.left < user.right) ||
        (energy1.top > user.top &&
          energy1.top < user.bottom &&
          energy1.left > user.left &&
          energy1.left < user.right) ||
        (energy1.top > user.top &&
          energy1.top < user.bottom &&
          energy1.right > user.left &&
          energy1.right < user.right)
      ) {
        this.userDamage(5);
      }

      if (
        (energy2.bottom > user.top &&
          energy2.bottom < user.bottom &&
          energy2.right > user.left &&
          energy2.right < user.right) ||
        (energy2.bottom > user.top &&
          energy2.bottom < user.bottom &&
          energy2.left > user.left &&
          energy2.left < user.right) ||
        (energy2.top > user.top &&
          energy2.top < user.bottom &&
          energy2.left > user.left &&
          energy2.left < user.right) ||
        (energy2.top > user.top &&
          energy2.top < user.bottom &&
          energy2.right > user.left &&
          energy2.right < user.right)
      ) {
        this.userDamage(5);
      }

      if (
        (energy3.bottom > user.top &&
          energy3.bottom < user.bottom &&
          energy3.right > user.left &&
          energy3.right < user.right) ||
        (energy3.bottom > user.top &&
          energy3.bottom < user.bottom &&
          energy3.left > user.left &&
          energy3.left < user.right) ||
        (energy3.top > user.top &&
          energy3.top < user.bottom &&
          energy3.left > user.left &&
          energy3.left < user.right) ||
        (energy3.top > user.top &&
          energy3.top < user.bottom &&
          energy3.right > user.left &&
          energy3.right < user.right)
      ) {
        this.userDamage(5);
      }

      if (
        (energy4.bottom > user.top &&
          energy4.bottom < user.bottom &&
          energy4.right > user.left &&
          energy4.right < user.right) ||
        (energy4.bottom > user.top &&
          energy4.bottom < user.bottom &&
          energy4.left > user.left &&
          energy4.left < user.right) ||
        (energy4.top > user.top &&
          energy4.top < user.bottom &&
          energy4.left > user.left &&
          energy4.left < user.right) ||
        (energy4.top > user.top &&
          energy4.top < user.bottom &&
          energy4.right > user.left &&
          energy4.right < user.right)
      ) {
        this.userDamage(5);
      }
    }, 200);
  }

  castEnemeySpells() {
    this.stateSpellEnemyOne = 'first';
    this.stateSpellEnemyTwo = 'first';
    this.stateSpellEnemyThree = 'first';
    this.stateSpellEnemyFour = 'first';

    let enemy = this.enemy.nativeElement;
    let enemyCoord = enemy.getBoundingClientRect();

    let energy = this.energy1.nativeElement;
    let energyCoord = energy.getBoundingClientRect();

    let background = this.background.nativeElement;
    let backgroundCoord = background.getBoundingClientRect();

    let x =
      Math.random() *
        (backgroundCoord.top - (backgroundCoord.bottom - energyCoord.height)) +
      (backgroundCoord.bottom - energyCoord.height);
    let y =
      Math.random() *
        (backgroundCoord.left - (backgroundCoord.right - energyCoord.width)) +
      (backgroundCoord.right - energyCoord.width);

    this.left5 = enemyCoord.left + enemyCoord.width / 2 - energyCoord.width / 2;
    this.top5 = enemyCoord.top + enemyCoord.height / 2 - energyCoord.height / 2;

    this.left6 = backgroundCoord.left;
    this.top6 = x;

    this.left7 = y;
    this.top7 = backgroundCoord.top;

    this.left8 = backgroundCoord.right - energyCoord.width;
    this.top8 = x;

    this.left9 = y;
    this.top9 = backgroundCoord.bottom - energyCoord.height;

    setTimeout(() => {
      this.stateSpellEnemyOne = 'second';
      this.stateSpellEnemyTwo = 'second';
      this.stateSpellEnemyThree = 'second';
      this.stateSpellEnemyFour = 'second';
    }, 0);
  }

  castingEnemySpells() {
    this.enemySpellsTimerId = setInterval(() => {
      this.castEnemeySpells();
    }, 3000);
  }

  userDamage(damage: number) {
    this.store.dispatch(decreaseUserHealth({ health: damage }));

    this.store.select(selectUserHealth).subscribe((health) => {
      this.userHealth = health + '%';

      if (health <= 0) this.router.navigate(['loss']);
    });
  }

  enemyDamage(damage: number) {
    this.store.dispatch(decreaseEnemyHealth({ health: damage }));

    this.store.select(selectEnemyHealth).subscribe((health) => {
      this.enemyHealth = health + '%';

      if (health <= 0) this.router.navigate(['win']);
    });
  }

  enemySpellsTimerId: any;
  userDamageTrackingId: any;
  enemyDamageTrackingId: any;

  userHealth: string = '100%';
  enemyHealth: string = '100%';

  isFireVisible: boolean = false;
  isSpellComplete: boolean = true;
  isAudioOn: boolean = false;

  left1: number = 0;
  top1: number = 0;
  left2: number = 0;
  top2: number = 0;
  left3: number = 0;
  top3: number = 0;
  left4: number = 0;
  top4: number = 0;
  left5: number = 0;
  top5: number = 0;
  left6: number = 0;
  top6: number = 0;
  left7: number = 0;
  top7: number = 0;
  left8: number = 0;
  top8: number = 0;
  left9: number = 0;
  top9: number = 0;

  time: number = 1;
  time2: number = 2;
  time3: number = 3;

  timerId: any;

  degree: string = 'rotate(270deg)';

  stateMoving: string = '';
  stateSpell: string = '';
  stateSpellEnemyOne: string = '';
  stateSpellEnemyTwo: string = '';
  stateSpellEnemyThree: string = '';
  stateSpellEnemyFour: string = '';
  stateSteps: string = '';

  @ViewChild('user') user!: ElementRef;
  @ViewChild('enemy') enemy!: ElementRef;
  @ViewChild('background') background!: ElementRef;
  @ViewChild('energy1') energy1!: ElementRef;
  @ViewChild('energy2') energy2!: ElementRef;
  @ViewChild('energy3') energy3!: ElementRef;
  @ViewChild('energy4') energy4!: ElementRef;
  @ViewChild('fireball') fireball!: ElementRef;

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

    this.fireSound();

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
    }, this.time2 * 1000);

    this.isFireVisible = true;
  }

  fireSound() {
    if (!this.isAudioOn) return;
    let sound = new Audio('./../assets/audio/fire.mp3');
    sound.play();
  }

  toggleSound() {
    if (this.isAudioOn) {
      this.isAudioOn = false;
    } else {
      this.isAudioOn = true;
    }
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
