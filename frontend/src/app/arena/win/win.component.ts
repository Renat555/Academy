import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetHealth } from '../../store/actions/arena.action';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.less'],
})
export class WinComponent {
  constructor(private router: Router, private store: Store) {}

  newGame() {
    this.store.dispatch(resetHealth());
    this.router.navigate(['arena/game']);
  }
}
