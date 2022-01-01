import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDescription } from 'src/app/store/selectors/duels/description.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.less'],
})
export class DescriptionComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectDescription).subscribe((state) => {});
  }

  description = '';
}
