import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetHealth } from '../../store/actions/arena.action';

@Component({
  selector: 'app-loss',
  templateUrl: './loss.component.html',
  styleUrls: ['./loss.component.less'],
})
export class LossComponent {
  constructor(private router: Router, private store: Store) {}

  newGame() {
    this.store.dispatch(resetHealth());
    this.router.navigate(['']);
  }
}
