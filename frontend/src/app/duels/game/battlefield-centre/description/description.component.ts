import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectDescription } from 'src/app/store/selectors/duels/description.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.less'],
})
export class DescriptionComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  description: string[][] = [];

  descriptionSubscription = new Subscription();

  ngOnInit(): void {
    this.store.select(selectDescription).subscribe((state) => {
      this.description = state;
    });
  }

  ngOnDestroy(): void {
    this.descriptionSubscription.unsubscribe();
  }
}
