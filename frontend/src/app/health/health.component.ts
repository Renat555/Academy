import { changeUserHealth } from './../store/actions/arena.action';
import { selectUserHealth } from './../store/reducers/arena.reducer';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.less'],
})
export class HealthComponent {
  constructor(
    private store: Store<{
      health: number;
    }>
  ) {
    this.store.select(selectUserHealth).subscribe((v) => {
      console.log(v);
    });
  }

  getWidth() {
    return '100%';
  }
}
