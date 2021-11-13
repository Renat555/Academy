import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.less'],
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
  ],
})
export class HallComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.setObjects();
    }, 0);
  }

  timerId: any;

  portalText: string = 'Учебное сражение с магической аномалией';
  standText: string = 'Тренировка интуиции';

  isHintPortalHidden: boolean = true;
  isHintStandHidden: boolean = true;

  stateMoving: string = '';
  stateSteps: string = '';

  userTop: string = '';
  userLeft: string = '';
  hintPortalTop: string = '';
  hintPortalLeft: string = '';
  hintStandTop: string = '';
  hintStandLeft: string = '';
  portalTop: string = '';
  portalLeft: string = '';
  standTop: string = '';
  standLeft: string = '';

  time: number = 1;

  left1: number = 0;
  top1: number = 0;
  left2: number = 0;
  top2: number = 0;

  userLocationTrackingId: any;

  @ViewChild('user') user!: ElementRef;
  @ViewChild('background') background!: ElementRef;
  @ViewChild('portal') portal!: ElementRef;
  @ViewChild('hintPortal') hintPortal!: ElementRef;
  @ViewChild('hintStand') hintStand!: ElementRef;
  @ViewChild('stand') stand!: ElementRef;

  showHintPortal() {
    this.isHintPortalHidden = false;

    setTimeout(() => {
      let portal = this.portal.nativeElement.getBoundingClientRect();
      let hint = this.hintPortal.nativeElement.getBoundingClientRect();

      let top = portal.top - hint.height - 5;
      let left = portal.left + portal.width / 2 - hint.width / 2;

      this.hintPortalTop = top + 'px';
      this.hintPortalLeft = left + 'px';
    }, 0);
  }

  showHintStand() {
    this.isHintStandHidden = false;

    setTimeout(() => {
      let stand = this.stand.nativeElement.getBoundingClientRect();
      let hint = this.hintStand.nativeElement.getBoundingClientRect();

      let top = stand.top - hint.height - 5;
      let left = stand.left + stand.width / 2 - hint.width / 2;

      this.hintStandTop = top + 'px';
      this.hintStandLeft = left + 'px';
    }, 0);
  }

  hideHintStand() {
    this.isHintStandHidden = true;
  }

  hideHintPortal() {
    this.isHintPortalHidden = true;
  }

  setObjects() {
    let background = this.background.nativeElement.getBoundingClientRect();
    let user = this.user.nativeElement.getBoundingClientRect();

    this.userTop = background.top + 500 + 'px';
    this.userLeft = background.left + 300 + 'px';

    this.portalTop = background.top + 400 + 'px';
    this.portalLeft = background.left + 900 + 'px';

    this.standTop = background.top + 370 + 'px';
    this.standLeft = background.left + 480 + 'px';
  }

  stepSound() {
    //if (!this.isAudioOn) return;
    let sound = new Audio('./../assets/audio/step.mp3');
    sound.play();
  }

  makeSteps(time: number, direction: string) {
    let toggle: boolean = true;

    let id = setInterval(() => {
      this.stepSound();

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

  userLocationTracking() {
    this.userLocationTrackingId = setInterval(() => {
      if (!this.user) return;

      let user = this.user.nativeElement.getBoundingClientRect();
      let portal = this.portal.nativeElement.getBoundingClientRect();

      if (
        (user.bottom > portal.top &&
          user.bottom < portal.bottom &&
          user.right > portal.left &&
          user.right < portal.right) ||
        (user.bottom > portal.top &&
          user.bottom < portal.bottom &&
          user.left > portal.left &&
          user.left < portal.right) ||
        (user.top > portal.top &&
          user.top < portal.bottom &&
          user.left > portal.left &&
          user.left < portal.right) ||
        (user.top > portal.top &&
          user.top < portal.bottom &&
          user.right > portal.left &&
          user.right < portal.right)
      ) {
        this.router.navigate(['arena']);
      }
    }, 1000);
  }

  setPoint(event: MouseEvent) {
    if (event.button != 0) return;

    let target = event.target as HTMLElement;

    if (target.dataset.way == 'obstacle') {
      return;
    }

    if (target.dataset.goal === 'portal') {
      this.userLocationTracking();
    } else {
      clearInterval(this.userLocationTrackingId);
    }

    let user = this.user.nativeElement.getBoundingClientRect();

    this.left1 = user.left;
    this.top1 = user.top;

    this.stateMoving = 'first';

    this.left2 = event.clientX - user.width / 2;
    this.top2 = event.clientY - user.height / 2;

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
