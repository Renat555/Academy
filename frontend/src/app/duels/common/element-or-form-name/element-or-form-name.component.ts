import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  addElement,
  addForm,
  deleteDespell,
  deleteElement,
  deleteForm,
} from 'src/app/store/actions/duels/currentSpell.actions';
import { deletePreparedSpells } from 'src/app/store/actions/duels/map.actions';
import {
  selectElement,
  selectForm,
} from 'src/app/store/selectors/duels/currentSpell.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-element-or-form-name',
  templateUrl: './element-or-form-name.component.html',
  styleUrls: ['./element-or-form-name.component.less'],
})
export class ElementOrFormNameComponent implements DoCheck, OnDestroy {
  constructor(private store: Store<AppState>) {}

  formSubscription = new Subscription();
  elementSubscription = new Subscription();

  ngDoCheck(): void {
    let form = '';
    let element = '';

    this.formSubscription = this.store.select(selectForm).subscribe((state) => {
      form = state;
    });

    this.elementSubscription = this.store
      .select(selectElement)
      .subscribe((state) => {
        element = state;
      });

    if (form === this.name || element === this.name) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  @Input() name?: string;
  @Input() russianName?: string;
  @Input() type?: string;

  isSelected = false;

  select() {
    this.deletePreviousSpell();

    if (this.type === 'form') {
      this.store.dispatch(deleteForm());

      if (this.name) {
        this.store.dispatch(addForm({ form: this.name }));
        this.isSelected = true;
      }
    } else if (this.type === 'element') {
      this.store.dispatch(deleteElement());

      if (this.name) {
        this.store.dispatch(addElement({ element: this.name }));
        this.isSelected = true;
      }
    }
  }

  deletePreviousSpell() {
    this.store.dispatch(deleteDespell());
    this.store.dispatch(deletePreparedSpells());
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.elementSubscription.unsubscribe();
  }
}
