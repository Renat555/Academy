import { selectUserHealth } from './../store/reducers/arena.reducer';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.less'],
})
export class HealthComponent {
  constructor(private store: Store) {}

  getWidth() {
    // this.store.pipe(select(selectUserHealth)).subscribe((health) => {
    //   console.log(health);
    // });
    return '100%';
  }
}
