import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addDescriptionBlock,
  addDescriptionRow,
} from 'src/app/store/actions/duels/description.actions';
import { showEffects } from 'src/app/store/actions/duels/effectsWindow.actions';
import { selectDescription } from 'src/app/store/selectors/duels/description.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-battlefield-centre',
  templateUrl: './battlefield-centre.component.html',
  styleUrls: ['./battlefield-centre.component.less'],
})
export class BattlefieldCentreComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  showEffects() {
    this.store.dispatch(showEffects());
  }

  addDescriptionRow() {
    this.store.dispatch(
      addDescriptionRow({
        description:
          'Повседневная практика показывает, что выбранный нами инновационный путь',
      })
    );
  }

  addDescriptionBlock() {
    this.store.dispatch(
      addDescriptionBlock({
        description:
          'Не следует, однако, забывать о том, что консультация с профессионалами из IT позволяет',
      })
    );
  }

  showDescription() {
    this.store.select(selectDescription).subscribe((state) => {
      console.log(state);
    });
  }
}
