import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTest } from 'src/app/store/selectors/duels/test.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-wait-screen',
  templateUrl: './wait-screen.component.html',
  styleUrls: ['./wait-screen.component.less'],
})
export class WaitScreenComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectTest).subscribe((res) => {
      console.log(res);
    });
  }
}
